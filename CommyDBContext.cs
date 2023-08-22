using Commy.Models;
using Microsoft.EntityFrameworkCore;

namespace Commy
{
    public class CommyDBContext: DbContext
    {
        public DbSet<Category> Category { get; set; }
        public CommyDBContext(DbContextOptions options) : base(options) { }
    }
}
