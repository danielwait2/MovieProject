
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieProject.API.Data;

namespace MovieProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RecController : ControllerBase
    {
        private readonly RecsContext _recContext;
        private readonly MovieDbContext _movieContext;

        public RecController(RecsContext recContext, MovieDbContext movieContext)
        {
            _recContext = recContext;
            _movieContext = movieContext;
        }

        [HttpGet("UserRec")]
        public IActionResult GetMovies(int userId, int numRecs)
        {
            // Step 1: Get recommended movie IDs
            var recommended = _recContext.UserRecs
                .Where(r => r.UserId == userId)
                .OrderBy(r => r.RecNum) // if you have a score
                .Take(numRecs)
                .Select(r => r.ShowId)
                .ToList();

            if (!recommended.Any())
                return NotFound("No recommendations found for this user.");

            // Step 2: Load the full movie info from the second DB
            var movies = _movieContext.Movies
                .Where(m => recommended.Contains(m.ShowId))
                .ToList();

            return Ok(movies);
        }

    }
}


