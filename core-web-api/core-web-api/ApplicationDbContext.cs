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
    }
}
