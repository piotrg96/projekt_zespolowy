using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppName.Models
{
    public class City
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string CityName { get; set; }
        public virtual Province Province { get; set; }
        public int ProvinceId { get; set; }
        public virtual ICollection<Advertisement> Advertisements { get; set; }
    }
}
