using System;
using System.Collections.Generic;

namespace AppName.Models
{
    public class AdvertisementModel : BaseModel
    {

        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public float Yardage { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime CreationDate { get; set; }

        public string Username { get; set; }

        public virtual CategoryModel Category { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual ProvinceModel Province { get; set; }
        public int? ProvinceId { get; set; }
        public string ProvinceName { get; set; }

        public virtual CityModel City { get; set; }
        public int? CityId { get; set; }
        public string CityName { get; set; }

        public virtual ICollection<ImageModel> AdvertisementImages { get; set; }

    }
}
