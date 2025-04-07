using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieProject.API.Data
{
    [Table("movies_ratings")] // Maps to the "movies_ratings" table
    public class Rating
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("show_id")]
        public string ShowId { get; set; }

        [Column("rating")]
        public int RatingValue { get; set; }
    }
}