﻿using System;
using System.Collections.Generic;

namespace AppName.Models
{
    public class Advertisement : BaseModel
    {

        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public float Yardage { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime CreationDate { get; set; }

        public string Username { get; set; }

        public virtual Category Category { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual Province Province { get; set; }
        public int? ProvinceId { get; set; }
        public string ProvinceName { get; set; }

        public virtual City City { get; set; }
        public int? CityId { get; set; }
        public string CityName { get; set; }

        public virtual ICollection<Image> AdvertisementImages { get; set; }

    }
}