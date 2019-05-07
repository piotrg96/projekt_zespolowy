using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class ImageModel
    {
        public string Path { get; set; }
        public virtual AdvertisementModel Advert { get; set; }
        public int AdvertisementId { get; set; }

    }
}
