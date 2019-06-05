using Microsoft.EntityFrameworkCore;

namespace AppName.Models
{
    public class AdvertisementContext : DbContext
    {

        public AdvertisementContext(DbContextOptions<AdvertisementContext> options) : base(options)
        {

        }


        public DbSet<AdvertisementModel> Advertisment { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<CityModel> Cities { get; set; }
        public DbSet<ProvinceModel> Provinces { get; set; }
        public DbSet<ImageModel> Images { get; set; }
        public DbSet<MessageModel> MessageModel { get; set; }
        public DbSet<FavoriteAds> FavoriteAds { get; set; }
    }
}
