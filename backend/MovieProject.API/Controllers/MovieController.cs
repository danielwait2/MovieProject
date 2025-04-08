using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieProject.API.Data;

namespace MovieProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class MovieController : ControllerBase
    {
        private readonly MovieDbContext _movieContext;

        public MovieController(MovieDbContext temp) => _movieContext = temp;

        [HttpGet("RecMoviesTemp")]
        public IActionResult GetMovies([FromQuery] List<string>? genres = null)
        {
            var query = _movieContext.Movies.AsQueryable();

            if (genres != null && genres.Any())
            {
                query = query.Where(m => m.MovieGenres.Any(mg => genres.Contains(mg.Genre.Name)));
            }

            var movies = query
                .Include(m => m.MovieGenres)
                .ThenInclude(mg => mg.Genre)
                .Take(10)
                .ToList();

            return Ok(movies);
        }

        // New endpoint to fetch details for a single movie using its unique ID.
        [HttpGet("Details/{show_id}")]
        public IActionResult GetMovieDetails(string show_id)
        {
            var movie = _movieContext.Movies
                .Include(m => m.MovieGenres)
                .ThenInclude(mg => mg.Genre)
                .FirstOrDefault(m => m.ShowId == show_id); 

            if (movie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }
            return Ok(movie);
        }

        [HttpGet("ContentRecommendations")]
        public IActionResult GetContentRecomendation(string movieName)
        {
            var record = _movieContext.MovieRecomendation
                            .FirstOrDefault(c => c.movieName.Equals(movieName, StringComparison.OrdinalIgnoreCase));

            if (record == null)
            {
                return NotFound(new { message = $"No recommendations found for movie: {movieName}" });
            }

            var recommendations = new List<string>
            {
                record.Recommendation1,
                record.Recommendation2,
                record.Recommendation3,
                record.Recommendation4,
                record.Recommendation5
            }
            .Where(r => !string.IsNullOrEmpty(r))
            .ToList();

            if (!recommendations.Any())
            {
                return NotFound(new { message = $"No recommendations found for movie: {movieName}" });
            }

            return Ok(recommendations);
        }

        [HttpGet("CollaborativeRecommendations")]
        public IActionResult GetCollaborativeRecommendations(string movieName)
        {
            var record = _movieContext.MovieRecomendation
                            .FirstOrDefault(c => c.movieName.Equals(movieName, StringComparison.OrdinalIgnoreCase));

            if (record == null)
            {
                return NotFound(new { message = $"No recommendations found for movie: {movieName}" });
            }

            var recommendations = new List<string>
            {
                record.Recommendation1,
                record.Recommendation2,
                record.Recommendation3,
                record.Recommendation4,
                record.Recommendation5
            }
            .Where(r => !string.IsNullOrEmpty(r))
            .ToList();

            if (!recommendations.Any())
            {
                return NotFound(new { message = $"No recommendations found for movie: {movieName}" });
            }

            return Ok(recommendations);
        }

        [HttpGet("Genres")]
        public IActionResult GetGenres()
        {
            var genres = _movieContext.Genres
                .Select(m => m.Name)
                .ToList();
            return Ok(genres);
        }

        [HttpGet("AllMovies")]
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1, string searchQuery = "", [FromQuery] List<string>? projectTypes = null)
        {
            var query = _movieContext.Movies.AsQueryable();

            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => p.Genres.Any(g => projectTypes.Contains(g)));
            }
            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                query = query.Where(m => m.Title.ToLower().Contains(searchQuery.ToLower()));
            }

            var totalNumProjects = query.Count();
            var movies = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                Projects = movies,
                TotalNumProjects = totalNumProjects
            };

            return Ok(result);
        }

        [HttpGet("GetMovieTypes")]
        public IActionResult GetProjectTypes()
        {
            var projectTypes = _movieContext.Movies
                .Select(p => p.Genres)
                .Distinct()
                .ToList();

            return Ok(projectTypes);
        }

        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] Movie newMovie)
        {
            _movieContext.Movies.Add(newMovie);
            _movieContext.SaveChanges();
            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{show_id}")]
        public IActionResult UpdateProject(string show_id, [FromBody] MovieUpdateDTO updatedMovie)
        {
            var existingMovie = _movieContext.Movies.Find(show_id);

            if (existingMovie == null)
            {
                return NotFound();
            }

            existingMovie.Title = updatedMovie.Title;
            existingMovie.Director = updatedMovie.Director;
            existingMovie.Cast = updatedMovie.Cast;
            existingMovie.Country = updatedMovie.Country;
            existingMovie.release_year = updatedMovie.ReleaseYear;
            existingMovie.Rating = updatedMovie.Rating;
            existingMovie.Duration = updatedMovie.Duration;
            existingMovie.Description = updatedMovie.Description;

            existingMovie.Action = 0;
            existingMovie.Adventure = 0;
            existingMovie.AnimeSeriesInternationalTvShows = 0;
            existingMovie.BritishTvShowsDocuseriesInternationalTvShows = 0;
            existingMovie.Children = 0;
            existingMovie.Comedies = 0;
            existingMovie.ComediesDramasInternationalMovies = 0;
            existingMovie.ComediesInternationalMovies = 0;
            existingMovie.ComediesRomanticMovies = 0;
            existingMovie.CrimeTvShowsDocuseries = 0;
            existingMovie.Documentaries = 0;
            existingMovie.DocumentariesInternationalMovies = 0;
            existingMovie.Docuseries = 0;
            existingMovie.Dramas = 0;
            existingMovie.DramasInternationalMovies = 0;
            existingMovie.DramasRomanticMovies = 0;
            existingMovie.FamilyMovies = 0;
            existingMovie.Fantasy = 0;
            existingMovie.HorrorMovies = 0;
            existingMovie.InternationalMoviesThrillers = 0;
            existingMovie.InternationalTvShowsRomanticTvShowsTvDramas = 0;
            existingMovie.KidsTV = 0;
            existingMovie.LanguageTvShows = 0;
            existingMovie.Musicals = 0;
            existingMovie.NatureTv = 0;
            existingMovie.RealityTv = 0;
            existingMovie.Spirituality = 0;
            existingMovie.TvAction = 0;
            existingMovie.TvComedies = 0;
            existingMovie.TvDramas = 0;
            existingMovie.TalkShowsTvComedies = 0;
            existingMovie.Thrillers = 0;

            foreach (var genre in updatedMovie.Genres)
            {
                switch (genre)
                {
                    case "Action": existingMovie.Action = 1; break;
                    case "Adventure": existingMovie.Adventure = 1; break;
                    case "Anime Series International TV Shows": existingMovie.AnimeSeriesInternationalTvShows = 1; break;
                    case "British TV Shows Docuseries International TV Shows": existingMovie.BritishTvShowsDocuseriesInternationalTvShows = 1; break;
                    case "Children": existingMovie.Children = 1; break;
                    case "Comedies": existingMovie.Comedies = 1; break;
                    case "Comedies Dramas International Movies": existingMovie.ComediesDramasInternationalMovies = 1; break;
                    case "Comedies International Movies": existingMovie.ComediesInternationalMovies = 1; break;
                    case "Comedies Romantic Movies": existingMovie.ComediesRomanticMovies = 1; break;
                    case "Crime TV Shows Docuseries": existingMovie.CrimeTvShowsDocuseries = 1; break;
                    case "Documentaries": existingMovie.Documentaries = 1; break;
                    case "Documentaries International Movies": existingMovie.DocumentariesInternationalMovies = 1; break;
                    case "Docuseries": existingMovie.Docuseries = 1; break;
                    case "Dramas": existingMovie.Dramas = 1; break;
                    case "Dramas International Movies": existingMovie.DramasInternationalMovies = 1; break;
                    case "Dramas Romantic Movies": existingMovie.DramasRomanticMovies = 1; break;
                    case "Family Movies": existingMovie.FamilyMovies = 1; break;
                    case "Fantasy": existingMovie.Fantasy = 1; break;
                    case "Horror Movies": existingMovie.HorrorMovies = 1; break;
                    case "International Movies Thrillers": existingMovie.InternationalMoviesThrillers = 1; break;
                    case "International TV Shows Romantic TV Shows": existingMovie.InternationalTvShowsRomanticTvShowsTvDramas = 1; break;
                    case "Kids' TV": existingMovie.KidsTV = 1; break;
                    case "Language TV Shows": existingMovie.LanguageTvShows = 1; break;
                    case "Musicals": existingMovie.Musicals = 1; break;
                    case "Nature TV": existingMovie.NatureTv = 1; break;
                    case "Reality TV": existingMovie.RealityTv = 1; break;
                    case "Spirituality": existingMovie.Spirituality = 1; break;
                    case "TV Action": existingMovie.TvAction = 1; break;
                    case "TV Comedies": existingMovie.TvComedies = 1; break;
                    case "TV Dramas": existingMovie.TvDramas = 1; break;
                    case "Talk Shows TV Comedies": existingMovie.TalkShowsTvComedies = 1; break;
                    case "Thrillers": existingMovie.Thrillers = 1; break;
                }
            }

            _movieContext.SaveChanges();

            return Ok(existingMovie);
        }

        [HttpDelete("DeleteMovie/{show_id}")]
        public IActionResult DeleteMovie(int show_id)
        {
            var movie = _movieContext.Movies.Find(show_id);

            if (movie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }

            _movieContext.Movies.Remove(movie);
            _movieContext.SaveChanges();

            return NoContent();
        }
    }
}