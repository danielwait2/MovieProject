using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MovieProject.API.Data;
using System.Security.Claims;
using MovieProject.API.Services;
using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<BlobStorageService>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("MovieConnection"))
        .EnableSensitiveDataLogging()
        .LogTo(Console.WriteLine, LogLevel.Information));


builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

builder.Services.AddDbContext<RecsContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Data Source=recs.db"))
           .EnableSensitiveDataLogging()
           .LogTo(s => {
               Console.ForegroundColor = ConsoleColor.Yellow;
               Console.WriteLine("**** " + s + " ****");
               Console.ResetColor();
           }, LogLevel.Information));

builder.Services.AddAuthorization();

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();



builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email; // Ensure email is stored in claims
    // passwrods only requirement is a minimum length of 14 characters
    options.Password.RequiredLength = 14;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireDigit = false;
    options.Password.RequireNonAlphanumeric = false;
});

builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();


builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.LoginPath = "/login";
    options.Cookie.Name = ".AspNetCore.Identity.Application";

    // Set the expiration and sliding expiration
    options.ExpireTimeSpan = TimeSpan.FromMinutes(15); // or whatever timeout you want
    options.SlidingExpiration = true; // resets timeout on user activity
});

builder.Services.AddCors(options =>
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "https://wonderful-smoke-0afae881e.6.azurestaticapps.net")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        }));

builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// https redirection
app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapIdentityApi<IdentityUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    // Remove the authentication cookie with the matching options
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        SameSite = SameSiteMode.None,
        Secure = true,
        Path = "/"
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();


app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com"; // Ensure it's never null
    return Results.Json(new { email = email }); // Return as JSON
}).RequireAuthorization();

app.Run();