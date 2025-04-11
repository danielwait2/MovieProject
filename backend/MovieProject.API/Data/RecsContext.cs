using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MovieProject.API.Data;

public partial class RecsContext : DbContext
{
    public RecsContext()
    {
    }

    public RecsContext(DbContextOptions<RecsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ContentRec> ContentRecs { get; set; }

    public virtual DbSet<DefaultRec> DefaultRecs { get; set; }

    public virtual DbSet<MovieRec> MovieRecs { get; set; }

    public virtual DbSet<UserFav> UserFavs { get; set; }

    public virtual DbSet<UserRec> UserRecs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite("Data Source=recs.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContentRec>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Movie).HasColumnName("movie");
            entity.Property(e => e.Rec).HasColumnName("rec");
            entity.Property(e => e.Type).HasColumnName("type");
        });

        modelBuilder.Entity<DefaultRec>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.ShowId).HasColumnName("show_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<MovieRec>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.IfYouWatched).HasColumnName("If you watched");
            entity.Property(e => e.Recommendation1).HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation2).HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation3).HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation4).HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation5).HasColumnName("Recommendation 5");
        });

        modelBuilder.Entity<UserFav>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("UserFav");

            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.ShowId).HasColumnName("show_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        modelBuilder.Entity<UserRec>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.ShowId).HasColumnName("show_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
