using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class AdvertisementModel : BaseModel
    {

        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public float Yardage { get; set; } //metraż
        public string PhoneNumber { get; set; }
        public DateTime CreationDate { get; set; }

        public string username { get; set; }

        // one to many relation with Category
        public virtual CategoryModel Category { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        // one to many relation with Province
        public virtual ProvinceModel Province { get; set; } // województwo
        public int? ProvinceId { get; set; }
        public string ProvinceName { get; set; }


        // one to many relation with City
        public virtual CityModel City { get; set; }
        public int? CityId { get; set; }
        public string CityName { get; set; }


        // one to many relation with Image
        public virtual ICollection<ImageModel> Image { get; set; }
        public int ImageId { get; set; }

        /*
        public AdvertisementModel(Guid id, string title, string nameAdvert, string description, string type)
        {
            Id = Guid.NewGuid();
            Title = title;
            NameAdvert = nameAdvert;
            Type = type;
        }
        */

    }
}
