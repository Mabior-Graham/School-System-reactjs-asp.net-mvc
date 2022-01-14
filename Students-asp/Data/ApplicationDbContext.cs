using Microsoft.EntityFrameworkCore;
using Schsystem.Models;

namespace PrimarySchool.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Students> students { get; set; }



    }
}
