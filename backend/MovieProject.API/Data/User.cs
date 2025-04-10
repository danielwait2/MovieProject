using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieProject.API.Data
{
    [Table("Users")] // <-- If your physical table is named 'movies_users'
    public class User
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("name")]
        public string? Name { get; set; }

        [Column("phone")]
        public string? Phone { get; set; }

        [Column("email")]
        public string? Email { get; set; }

        [Column("age")]
        public int? Age { get; set; }

        [Column("gender")]
        public string? Gender { get; set; }

        // Subscriptions (stored as INTEGER)
        [Column("Netflix")]
        public int? Netflix { get; set; }

        [Column("amazonPrime")]
        public int? AmazonPrime { get; set; }

        [Column("Disney+")]
        public int? DisneyPlus { get; set; }

        [Column("Paramount+")]
        public int? ParamountPlus { get; set; }

        [Column("Max")]
        public int? Max { get; set; }

        [Column("Hulu")]
        public int? Hulu { get; set; }

        [Column("appleTV+")]
        public int? AppleTvPlus { get; set; }

        [Column("Peacock")]
        public int? Peacock { get; set; }

        // Location info
        [Column("city")]
        public string? City { get; set; }

        [Column("state")]
        public string? State { get; set; }

        [Column("zip")]
        public string? Zip { get; set; }
        [Column("identityUserId")]
        [Required]
        public string IdentityUserId { get; set; }
    }
}