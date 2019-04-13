﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class CategoryModel : BaseModel
    {
        public string Name { get; set; }

        public virtual ICollection<AdvertisementModel> Advertisements { get; set; } 
    }
}