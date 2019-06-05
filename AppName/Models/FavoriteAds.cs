using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class FavoriteAds
    {
        public int Id { get; set; }
        public int AdvertisementId { get; set; }
        public string UserName { get; set; }
    }
}
