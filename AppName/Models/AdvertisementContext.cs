using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class AdvertisementContext : DbContext
    {

        public AdvertisementContext(DbContextOptions options) : base(options)
        {

        }


        public DbSet<AdvertisementModel> Advertisment { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<CityModel> Cities { get; set; }
        public DbSet<ProvinceModel> Provinces { get; set; }
    }
}
