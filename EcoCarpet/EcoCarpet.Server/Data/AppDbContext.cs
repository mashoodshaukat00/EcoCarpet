using EcoCarpet.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace EcoCarpet.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<Carpet> Carpets { get; set; }


        // Override the onModelCreating method to configure fluet API
        // Configure Fluent API
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure one-to-many: Subscription -> Users.
            // One subscription plan can have many users.
            modelBuilder.Entity<User>()
                .HasOne(u => u.Subscription)
                .WithMany(s => s.Users)
                .HasForeignKey(u => u.SubscriptionID)
                .OnDelete(DeleteBehavior.Restrict);
        }        
    }
}
