using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieProject.API.Data
{
    [Table("movies_titles")] //physical table is named 'movies_titles'
    public class Movie
    {
        [Key]
        [Column("show_id")]
        public string? ShowId { get; set; }

        [Column("type")]
        public string? Type { get; set; }

        [Column("title")]
        public string? Title { get; set; }

        [Column("director")]
        public string? Director { get; set; }

        [Column("cast")]
        public string? Cast { get; set; }

        [Column("country")]
        public string? Country { get; set; }

        [Column("date_added")]
        public string? DateAdded { get; set; }

        [Column("release_year")]
        public int? ReleaseYear { get; set; }

        [Column("rating")]
        public string? Rating { get; set; }

        [Column("duration")]
        public string? Duration { get; set; }

        [Column("listed_in")]
        public string? ListedIn { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        // EXAMPLE for columns with spaces or special chars:
        //  [Column("TV Action")]
        //  public int? TvAction { get; set; }

        //  [Column("TV Dramas")]
        //  public int? TvDramas { get; set; }

        //  [Column("Anime Series International TV Shows")]
        //  public int? AnimeSeriesInternationalTvShows { get; set; }

        // ...Add the rest of your columns the same way.
    }
}