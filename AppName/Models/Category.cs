using System.Collections.Generic;

namespace AppName.Models
{
    public class Category : BaseModel
    {
        public string Name { get; set; }

        public virtual ICollection<Advertisement> Advertisements { get; set; }
    }
}
