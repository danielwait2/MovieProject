using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore; // Added for DbContext
using MovieProject.API.Data; // Adjust the namespace based on your project structure

namespace MovieProject.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context; // Added
        private readonly UserManager<IdentityUser> _userManager; // Added

        public AuthController(ApplicationDbContext context, UserManager<IdentityUser> userManager) // Updated
        {
            _context = context; // Added
            _userManager = userManager; // Added
        }

        // your methods here...

        [HttpGet("isadmin")]
        public async Task<IActionResult> IsAdmin([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new { message = "Email is required." });
            }

            // Find the user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Find all role IDs for this user
            var userRoleIds = await _context.UserRoles
                .Where(ur => ur.UserId == user.Id)
                .Select(ur => ur.RoleId)
                .ToListAsync();

            // Check if any of those role IDs match the Admin role
            var isAdmin = await _context.Roles
                .AnyAsync(r => userRoleIds.Contains(r.Id) && r.Name == "Admin");

            return Ok(new { email = email, isAdmin = isAdmin });
        }
    }
}
