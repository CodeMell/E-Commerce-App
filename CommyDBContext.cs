using Commy.Models;
using Microsoft.EntityFrameworkCore;

namespace Commy
{
    public class CommyDBContext: DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public CommyDBContext(DbContextOptions options) : base(options) { }
        public DbSet<Commy.Models.Products> Products { get; set; } = default!;
    }
}
