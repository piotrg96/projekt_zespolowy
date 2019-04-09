using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class CityModel : BaseModel
    {
        public string CityName { get; set; }

        // one to many relation with Province
        public virtual ProvinceModel Province { get; set; }
        public int ProvinceId { get; set; }
    }
}
