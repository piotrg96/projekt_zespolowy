using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class AdvertisementContext : DbContext
    {
<<<<<<< HEAD
=======
        public AdvertisementContext(DbContextOptions options) : base(options)
        {

        }

>>>>>>> a0039be39329b7330522ec9412b7cb709a208ff9
        public DbSet<AdvertisementModel> Advertisment { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
    }
}
