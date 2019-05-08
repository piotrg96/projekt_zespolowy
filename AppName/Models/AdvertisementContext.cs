using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppName.Models;

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
        public DbSet<CommentModel> Comments { get; set; }
        public DbSet<ImageModel> Images { get; set; }
        public DbSet<AppName.Models.MessageModel> MessageModel { get; set; }
    }
}
