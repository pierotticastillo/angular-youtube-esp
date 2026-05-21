using core_web_api.Entities;
using Microsoft.EntityFrameworkCore;

namespace core_web_api
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Laptop> Laptops { get; set; }

        protected ApplicationDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Laptop>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.HasIndex(e => e.Name).IsUnique();
            });
        }
    }
}
