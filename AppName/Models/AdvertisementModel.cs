using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class AdvertisementModel
    {
      
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string NameAdvert { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }

        public virtual CategoryModel Category { get; set; }
        public int CategoryId { get; set; }


        public AdvertisementModel(Guid id, string title, string nameAdvert, string description, string type)
        {
            Id = Guid.NewGuid();
            Title = title;
            NameAdvert = nameAdvert;
            Type = type;
        }


    }
}
