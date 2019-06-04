using System.Collections.Generic;

namespace AppName.Models
{
    public class CategoryModel : BaseModel
    {
        public string Name { get; set; }

        public virtual ICollection<AdvertisementModel> Advertisements { get; set; }
    }
}
