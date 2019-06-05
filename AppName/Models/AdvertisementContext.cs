using Microsoft.EntityFrameworkCore;

namespace AppName.Models
{
    public class AdvertisementContext : DbContext
    {

        public AdvertisementContext(DbContextOptions<AdvertisementContext> options) : base(options)
        {

        }


        public DbSet<Advertisement> Advertisment { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Message> MessageModel { get; set; }
        public DbSet<FavoriteAd> FavoriteAds { get; set; }
    }
}
