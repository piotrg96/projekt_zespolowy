using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class AdvertisementModelCreate
    {
        public string title { get; set; }
        public string categoryName { get; set; }
        public string cityName { get; set; }
        public string provinceName { get; set; }
        public string description { get; set; }
        public float price { get; set; }
        public float yardage { get; set; }
        public string phone { get; set; }
        public string userName { get; set; }
    }
}
