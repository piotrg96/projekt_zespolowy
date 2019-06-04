using System.ComponentModel.DataAnnotations;

namespace AppName.Models
{
    public class ImageModel
    {

        [Key]
        public string Path { get; set; }
        public int AdvertisementId { get; set; }
    }
}
