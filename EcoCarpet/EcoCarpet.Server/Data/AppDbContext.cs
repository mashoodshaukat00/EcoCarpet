using EcoCarpet.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace EcoCarpet.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Define your tables here
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Carpet> Carpets { get; set; }
    }
}
