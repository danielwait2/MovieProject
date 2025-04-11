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

        [HttpGet("LikedMovies")]
        public async Task<IActionResult> GetLikedRecs()
        {

            // Fallback: use the IdentityUserId from the NameIdentifier claim
            var email = User.FindFirstValue(ClaimTypes.Email);
            var userId = await _moviesContext.Users
                .Where(u => u.Email == email)
                .Select(u => u.UserId)
                .FirstOrDefaultAsync();

            try
            {
                // Query for recommendations asynchronously.
                var reviewedMovies = await _recContext.UserFavs
                    .Where(r => r.UserId == userId)
                    .Select(r => r.ShowId)
                    .ToListAsync();

                var movies = _moviesContext.Movies
                    .Where(m => reviewedMovies.Contains(m.ShowId))
                    .ToList();

                return Ok(movies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving recommendations.");
            }
        }

        [HttpGet("UserRecMain")]
        public async Task<IActionResult> GetMainRecs(int numRecs)
        {

            // Fallback: use the IdentityUserId from the NameIdentifier claim
            var email = User.FindFirstValue(ClaimTypes.Email);

                var userId = await _moviesContext.Users
                    .Where(u => u.Email == email)
                    .Select(u => u.UserId)
                    .FirstOrDefaultAsync();


                var recs = await _recContext.UserRecs
                    .Where(r => r.UserId == userId)
                    .OrderBy(r => r.RecNum)
                    .Take(numRecs)
                    .Select(r => r.ShowId)
                    .ToListAsync();


            if (recs == null || !recs.Any())
            {
                 recs = await _recContext.DefaultRecs
                    .OrderBy(r => r.Rating)
                    .Take(numRecs)
                    .Select(r => r.ShowId)
                    .ToListAsync();

            }

            var movies = _moviesContext.Movies
                .Where(m => recs.Contains(m.ShowId))
                .ToList();
            return Ok(movies);
           
        }

            [HttpGet("UserRec")]
        public async Task<IActionResult> GetRecommendations(int numRecs)
        {

            // Try to get the custom claim.
            var customUserIdClaim = User.FindFirst("CustomUserId")?.Value;

                // Fallback: use the IdentityUserId from the NameIdentifier claim
                var email = User.FindFirstValue(ClaimTypes.Email);
                var userId = await _moviesContext.Users
                    .Where(u => u.Email == email)
                    .Select(u => u.UserId)
                    .FirstOrDefaultAsync();



            try
            {
 
                // Query for recommendations asynchronously.
                var reviewedMovies = await _recContext.UserFavs
                    .Where(r => r.UserId == userId)
                    .Select(r => r.ShowId)
                    .ToListAsync();

                if (!reviewedMovies.Any())
                {
                    return NotFound("This user has not reviewed any movies.");
                }

                var recIds = await _recContext.ContentRecs.Where(r => reviewedMovies.Contains(r.Movie))
                    .Select(r => r.Rec)
                    .Distinct()
                    .ToListAsync();


                var movies = _moviesContext.Movies
                    .Where(m => recIds.Contains(m.ShowId))
                    .ToList();

                return Ok(movies);
            }
            catch (Exception ex)
            {
                // Log the exception ex (using a logging framework or similar)
                return StatusCode(500, $"An error occurred while retrieving recommendations. Details: {ex.Message}");
            }
        }

        [HttpGet("ContentRec")]
        public async Task<IActionResult> GetMovieRecommendations(string movieId)
        {
            var recs = await _recContext.ContentRecs
                .Where(r => r.Movie == movieId)
                .Select(r => r.Rec)
                .ToListAsync();

            var movieRecs = await _moviesContext.Movies.Where(m => recs.Contains(m.ShowId)).ToListAsync();

            return Ok(movieRecs);
        }


        //    [HttpGet("MovieRec")]
        //public async Task<IActionResult> GetMovieRecommendations(string title, int numRecs)
        //{

        //    // Query for recommendations asynchronously.
        //    // Get a flat list of recommended titles using Union.
        //    var recommendedTitles = await _recContext.MovieRecs
        //        .Where(r => r.IfYouWatched == title)
        //        .Select(r => r.Recommendation1)
        //        .Union(
        //            _recContext.MovieRecs.Where(r => r.IfYouWatched == title)
        //                .Select(r => r.Recommendation2)
        //        )
        //        .Union(
        //            _recContext.MovieRecs.Where(r => r.IfYouWatched == title)
        //                .Select(r => r.Recommendation3)
        //        )
        //        .Union(
        //            _recContext.MovieRecs.Where(r => r.IfYouWatched == title)
        //                .Select(r => r.Recommendation4)
        //        )
        //        .Union(
        //            _recContext.MovieRecs.Where(r => r.IfYouWatched == title)
        //                .Select(r => r.Recommendation5)
        //        )
        //        .Where(rec => rec != null)  // Optionally filter out nulls
        //        .ToListAsync();

        //    if (!recommendedTitles.Any())
        //        return NotFound("No recommendations found for this user.");

        //    // Query the Movies table for movies with titles in the recommended list.
        //    var movies = _moviesContext.Movies
        //        .Where(m => recommendedTitles.Contains(m.Title))
        //        .ToList();

        //    return Ok(movies);

        //}
    }
}
