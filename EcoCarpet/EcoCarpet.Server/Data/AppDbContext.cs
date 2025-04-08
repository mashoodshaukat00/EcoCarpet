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
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }


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

            // Configure one-to-many: User -> Payments
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure one-to-many: User -> Orders
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure one-to-many: Order -> OrderDetails
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.OrderID)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure many-to-one: OrderDetail -> Carpet
            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Carpet)
                .WithMany(c => c.OrderDetails)
                .HasForeignKey(od => od.CarpetID)
                .OnDelete(DeleteBehavior.Restrict);
        }        
    }
}
