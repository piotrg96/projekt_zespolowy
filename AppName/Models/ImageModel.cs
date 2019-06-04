﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class ImageModel
    {
 
        [Key]
        public string Path { get; set; }
        public int AdvertisementId { get; set; }
    }
}
