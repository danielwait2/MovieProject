using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using System;
using MovieProject.API.Data;

namespace MovieProject.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecController : ControllerBase
    {
        private readonly RecsContext _recContext;
        private readonly MovieDbContext _moviesContext;

        // Ensure you have exactly one constructor for DI
        public RecController(RecsContext recContext, MovieDbContext movieContext)
        {
            _recContext = recContext;
            _moviesContext = movieContext;
        }

        [HttpGet("UserRec")]
        public async Task<IActionResult> GetRecommendations(int numRecs)
        { 

            // Try to get the custom claim.
            var customUserIdClaim = User.FindFirst("CustomUserId")?.Value;

            int customUserId;
            if (!int.TryParse(customUserIdClaim, out customUserId))
            {
                // Fallback: use the IdentityUserId from the NameIdentifier claim
                var identityUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrWhiteSpace(identityUserId))
                {
                    return BadRequest("Invalid user.");
                }

                // Query the Movies database for the custom user record.
                var customUser = await _moviesContext.Users.FirstOrDefaultAsync(u => u.IdentityUserId == identityUserId);
                if (customUser == null)
                {
                    return BadRequest("Invalid user.");
                }
                customUserId = customUser.UserId;
            }
            else
            {
            }

            try
            {
                // Query for recommendations asynchronously.
                var recommended = await _recContext.UserRecs
                    .Where(r => r.UserId == customUserId)
                    .OrderBy(r => r.RecNum)
                    .Take(numRecs)
                    .Select(r => r.ShowId)
                    .ToListAsync();

                if (!recommended.Any())
                    return NotFound("No recommendations found for this user.");

                var movies = _moviesContext.Movies
                    .Where(m => recommended.Contains(m.ShowId))
                    .ToList();

                return Ok(movies);
            }
            catch (Exception ex)
            {
                // Log the exception ex (using a logging framework or similar)
                return StatusCode(500, $"An error occurred while retrieving recommendations. Details: {ex.Message}");
            }
        }

                [HttpGet("MovieRec")]
        public async Task<IActionResult> GetMovieRecommendations(string title, int numRecs)
        {

            // Query for recommendations asynchronously.
            // Get a flat list of recommended titles using Union.
            var recommendedTitles = await _recContext.MovieRecs
                .Where(r => r.IfYouWatched == title)
                .Select(r => r.Recommendation1)
                .Union(
                    _recContext.MovieRecs.Where(r => r.IfYouWatched == title)
                        .Select(r => r.Recommendation2)
                )
                .Union(
                    _recContext.MovieRecs.Where(r => r.IfYouWatched == title)
                        .Select(r => r.Recommendation3)
                )
                .Union(
                    _recContext.MovieRecs.Where(r => r.IfYouWatched == title)
                        .Select(r => r.Recommendation4)
                )
                .Union(
                    _recContext.MovieRecs.Where(r => r.IfYouWatched == title)
                        .Select(r => r.Recommendation5)
                )
                .Where(rec => rec != null)  // Optionally filter out nulls
                .ToListAsync();

            if (!recommendedTitles.Any())
                return NotFound("No recommendations found for this user.");

            // Query the Movies table for movies with titles in the recommended list.
            var movies = _moviesContext.Movies
                .Where(m => recommendedTitles.Contains(m.Title))
                .ToList();

            return Ok(movies);

        }
    }
}
