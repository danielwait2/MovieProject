using Microsoft.EntityFrameworkCore;

namespace MovieProject.API.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        {
        }

        // Each DbSet corresponds to a table
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Map the entities to their existing table names
            modelBuilder.Entity<Movie>().ToTable("movies_titles");
            modelBuilder.Entity<Rating>().ToTable("movies_ratings");
            modelBuilder.Entity<User>().ToTable("movies_users");

            base.OnModelCreating(modelBuilder);
        }
    }
}