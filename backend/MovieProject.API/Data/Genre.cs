using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MovieProject.API.Data
{
    public class Genre
    {
        [Required]
        [Key]
        public string Code { get; set; }

        [Column("Genre")]
        public string Name { get; set; }

        // Navigation property to the linking table
        [JsonIgnore]
        public ICollection <MovieGenre> MovieGenres { get; set; }
    }
}
