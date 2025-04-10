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
            try
            {
                var recommended = _recContext.UserRecs
                    .Where(r => r.UserId == userId)
                    .OrderBy(r => r.RecNum)
                    .Take(numRecs)
                    .Select(r => r.ShowId)
                    .ToList();

                if (!recommended.Any())
                    return NotFound("No recommendations found for this user.");

                var movies = _movieContext.Movies
                    .Where(m => recommended.Contains(m.ShowId))
                    .ToList();

                return Ok(movies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

    }
}
