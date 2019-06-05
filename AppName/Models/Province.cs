using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppName.Models
{
    public class Province
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string ProvinceName { get; set; }
        public virtual ICollection<City> Cities { get; set; }
        public virtual ICollection<Advertisement> Advertisements { get; set; }
    }
}
