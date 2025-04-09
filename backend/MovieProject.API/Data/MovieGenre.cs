using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieProject.API.Data
{
    public class MovieGenre
    {
        [Column("show_id")]
        public string ShowId { get; set; }

        [Column("genre_code")]
        public int GenreCode { get; set; }

        // Navigation properties
        public Movie Movie { get; set; }
        public Genre Genre { get; set; }
    }
}
