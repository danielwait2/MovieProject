using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MovieProject.API.Data;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MovieProject.API.Services
{
    public class CustomUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<IdentityUser, IdentityRole>
    {
        private readonly MovieDbContext _moviesDbContext;

        public CustomUserClaimsPrincipalFactory(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IOptions<IdentityOptions> optionsAccessor,
            MovieDbContext moviesDbContext)
            : base(userManager, roleManager, optionsAccessor)
        {
            _moviesDbContext = moviesDbContext;
        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(IdentityUser user)
        {
            // Call the base method to get the standard claims, including role claims.
            var identity = await base.GenerateClaimsAsync(user);

            // Ensure the email claim is present, if not already added.
            if (!identity.HasClaim(c => c.Type == ClaimTypes.Email))
            {
                identity.AddClaim(new Claim(ClaimTypes.Email, user.Email ?? ""));
            }

            // Check if a corresponding custom user record exists in your Movies database.
            var customUser = await _moviesDbContext.Users.FirstOrDefaultAsync(u => u.IdentityUserId == user.Id);

            if (customUser == null)
            {
                // If it doesn't exist, create the record.
                customUser = new User
                {
                    Email = user.Email,
                    IdentityUserId = user.Id,
                    // Optionally set additional properties such as DisplayName
                    Name = user.UserName
                };

                _moviesDbContext.Users.Add(customUser);
                await _moviesDbContext.SaveChangesAsync();
            }

            // Optionally, you can add the custom user's ID as a claim
            identity.AddClaim(new Claim("UserId", customUser.UserId.ToString()));

            return identity;
        }
    }
}
