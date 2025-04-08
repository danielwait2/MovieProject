using Microsoft.EntityFrameworkCore;

namespace MovieProject.API.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        {
        }

        // Each DbSet corresponds to a table
        public DbSet<Recommendation> MovieRecomendation { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<MovieGenre> MovieGenres { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<Movie>().HasNoKey(); // ONLY if the table doesn't have a primary key

            // Configure the composite key for the linking table
            modelBuilder.Entity<MovieGenre>()
                .HasKey(mg => new { mg.ShowId, mg.GenreCode });

            // Configure the Movie -> MovieGenre relationship
            modelBuilder.Entity<MovieGenre>()
                .HasOne(mg => mg.Movie)
                .WithMany(m => m.MovieGenres)
                .HasForeignKey(mg => mg.ShowId);

            // Configure the Genre -> MovieGenre relationship
            modelBuilder.Entity<MovieGenre>()
                .HasOne(mg => mg.Genre)
                .WithMany(g => g.MovieGenres)
                .HasForeignKey(mg => mg.GenreCode);

        }
        
    }
}