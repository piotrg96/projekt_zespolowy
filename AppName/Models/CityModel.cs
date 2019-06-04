using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class CityModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string CityName { get; set; }
        public virtual ProvinceModel Province { get; set; }
        public int ProvinceId { get; set; }
        public virtual ICollection<AdvertisementModel> Advertisements { get; set; }
    }
}
