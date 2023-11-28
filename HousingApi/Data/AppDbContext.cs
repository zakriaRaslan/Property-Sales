using HousingApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HousingApi.Data
{


    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<City> Cities { get; set; }
    }



}
