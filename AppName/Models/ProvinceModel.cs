using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppName.Models
{
    public class ProvinceModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string ProvinceName { get; set; }
        public virtual ICollection<CityModel> Cities { get; set; }
        public virtual ICollection<AdvertisementModel> Advertisements { get; set; }
    }
}
