using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class ProvinceModel : BaseModel
    {
        public string ProvinceName { get; set; }
        public virtual ICollection<CityModel> Cities { get; set; }
    }
}
