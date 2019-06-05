using System;
using System.Collections.Generic;

namespace AppName.Models
{
    public class GetAdvertisement
    {
        public virtual Category Category { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public virtual City City { get; set; }
        public int? CityId { get; set; }
        public string CityName { get; set; }
        public DateTime CreationDate { get; set; }
        public string Description { get; set; }
        public int Id { get; set; }
        public string PhoneNumber { get; set; }
        public float Price { get; set; }
        public virtual Province Province { get; set; }
        public int? ProvinceId { get; set; }
        public string ProvinceName { get; set; }
        public string Title { get; set; }
        public string Username { get; set; }
        public float Yardage { get; set; }
        public virtual List<Image> AdvertisementImages { get; set; }
        
        public GetAdvertisement(int id, string title, string description, float price, float yardage, string phoneNumber, string username, string categoryName, int categoryId, string provinceName, int? provinceId, string cityName, int? cityId)
        {
            Id = id; Title = title;
            Description = description;
            Price = price;
            Yardage = yardage;
            PhoneNumber = phoneNumber;
            Username = username;
            CategoryName = categoryName;
            CategoryId = categoryId;
            ProvinceName = provinceName;
            ProvinceId = provinceId;
            CityName = cityName;
            CityId = cityId;
        }
    }
}
