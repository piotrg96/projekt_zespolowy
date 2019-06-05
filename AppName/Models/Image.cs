using System.ComponentModel.DataAnnotations;

namespace AppName.Models
{
    public class Image
    {

        [Key]
        public string Path { get; set; }
        public int AdvertisementId { get; set; }
    }
}
