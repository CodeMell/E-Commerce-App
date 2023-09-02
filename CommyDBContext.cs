using Commy.Models;
using Microsoft.EntityFrameworkCore;

namespace Commy
{
    public class CommyDBContext: DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Commy.Models.Products> Products { get; set; } = default!;
        public CommyDBContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
