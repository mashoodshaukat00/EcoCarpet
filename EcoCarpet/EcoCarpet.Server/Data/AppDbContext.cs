using EcoCarpet.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace EcoCarpet.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        // Override the onModelCreating method to configure fluet API
        // Configure Fluent API
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                // Rename table to Users (plural)
                entity.ToTable("Users");

                // Configure primary key (renamed from CustomerId to UserId)
                entity.HasKey(u => u.UserID)
                      .HasName("PK_Users");

                // Configure column name explicitly (optional but explicit)
                entity.Property(u => u.UserID)
                      .HasColumnName("UserID");
            });
        }
        public DbSet<Carpet> Carpets { get; set; }
    }
}
