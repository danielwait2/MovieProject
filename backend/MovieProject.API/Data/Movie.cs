namespace MovieProject.API.Data
{
    public class Movie
    {
        // Basic movie info
        public string ShowId { get; set; }  // Primary key
        public string Type { get; set; }
        public string Title { get; set; }
        public string? Director { get; set; }
        public string? Cast { get; set; }
        public string? Country { get; set; }
        public string? DateAdded { get; set; }
        public int? ReleaseYear { get; set; }
        public string? Rating { get; set; }
        public string? Duration { get; set; }
        public string? ListedIn { get; set; }
        public string? Description { get; set; }

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
        public int? InternationalTvShowsRomanticTvShows { get; set; }
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
    }
}