using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MovieProject.API.Data
{
    public class Movie
    {
        // Basic movie info
        [Key]
        [Column("show_id")]
        public string ShowId { get; set; }
        
        public string Type { get; set; }
        public string Title { get; set; }
        public string? Director { get; set; }
        public string? Cast { get; set; }
        public string? Country { get; set; }
        public int? release_year { get; set; }
        public string? Rating { get; set; }
        public string? Duration { get; set; }
        public string? Description { get; set; }
        
        // Navigation property (not needed for genres output)
        [JsonIgnore]
        public ICollection<MovieGenre> MovieGenres { get; set; }

        // Genre/category columns
        public int? Action { get; set; }
        public int? Adventure { get; set; }
        public int? AnimeSeriesInternationalTvShows { get; set; }
        public int? BritishTvShowsDocuseriesInternationalTvShows { get; set; }
        public int? Children { get; set; }
        public int? Comedies { get; set; }
        public int? ComediesDramasInternationalMovies { get; set; }
        public int? ComediesInternationalMovies { get; set; }
        public int? ComediesRomanticMovies { get; set; }
        public int? CrimeTvShowsDocuseries { get; set; }
        public int? Documentaries { get; set; }
        public int? DocumentariesInternationalMovies { get; set; }
        public int? Docuseries { get; set; }
        public int? Dramas { get; set; }
        public int? DramasInternationalMovies { get; set; }
        public int? DramasRomanticMovies { get; set; }
        public int? FamilyMovies { get; set; }
        public int? Fantasy { get; set; }
        public int? HorrorMovies { get; set; }
        public int? InternationalMoviesThrillers { get; set; }
        public int? InternationalTvShowsRomanticTvShowsTvDramas { get; set; }
        public int? KidsTV { get; set; }
        public int? LanguageTvShows { get; set; }
        public int? Musicals { get; set; }
        public int? NatureTv { get; set; }
        public int? RealityTv { get; set; }
        public int? Spirituality { get; set; }
        public int? TvAction { get; set; }
        public int? TvComedies { get; set; }
        public int? TvDramas { get; set; }
        public int? TalkShowsTvComedies { get; set; }
        public int? Thrillers { get; set; }
        
        // Computed property for genres
        // This property is not mapped to the database, but we want it included in JSON output as "genre"
        [NotMapped]
        [JsonPropertyName("genre")]
        public List<string> Genres
        {
            get
            {
                var genres = new List<string>();

                if (Action == 1) genres.Add("Action");
                if (Adventure == 1) genres.Add("Adventure");
                if (AnimeSeriesInternationalTvShows == 1) genres.Add("Anime Series International TV Shows");
                if (BritishTvShowsDocuseriesInternationalTvShows == 1)
                    genres.Add("British TV Shows Docuseries International TV Shows");
                if (Children == 1) genres.Add("Children");
                if (Comedies == 1) genres.Add("Comedies");
                if (ComediesDramasInternationalMovies == 1)
                    genres.Add("Comedies Dramas International Movies");
                if (ComediesInternationalMovies == 1)
                    genres.Add("Comedies International Movies");
                if (ComediesRomanticMovies == 1) genres.Add("Comedies Romantic Movies");
                if (CrimeTvShowsDocuseries == 1) genres.Add("Crime TV Shows Docuseries");
                if (Documentaries == 1) genres.Add("Documentaries");
                if (DocumentariesInternationalMovies == 1)
                    genres.Add("Documentaries International Movies");
                if (Docuseries == 1) genres.Add("Docuseries");
                if (Dramas == 1) genres.Add("Dramas");
                if (DramasInternationalMovies == 1)
                    genres.Add("Dramas International Movies");
                if (DramasRomanticMovies == 1) genres.Add("Dramas Romantic Movies");
                if (FamilyMovies == 1) genres.Add("Family Movies");
                if (Fantasy == 1) genres.Add("Fantasy");
                if (HorrorMovies == 1) genres.Add("Horror Movies");
                if (InternationalMoviesThrillers == 1)
                    genres.Add("International Movies Thrillers");
                if (InternationalTvShowsRomanticTvShowsTvDramas == 1)
                    genres.Add("International TV Shows Romantic TV Shows");
                if (KidsTV == 1) genres.Add("Kids' TV");
                if (LanguageTvShows == 1) genres.Add("Language TV Shows");
                if (Musicals == 1) genres.Add("Musicals");
                if (NatureTv == 1) genres.Add("Nature TV");
                if (RealityTv == 1) genres.Add("Reality TV");
                if (Spirituality == 1) genres.Add("Spirituality");
                if (TvAction == 1) genres.Add("TV Action");
                if (TvComedies == 1) genres.Add("TV Comedies");
                if (TvDramas == 1) genres.Add("TV Dramas");
                if (TalkShowsTvComedies == 1) genres.Add("Talk Shows TV Comedies");
                if (Thrillers == 1) genres.Add("Thrillers");

                return genres;
            }
        }
    }
}