using System.ComponentModel.DataAnnotations;
namespace EcoCarpet.Server.Models
{
    public class Carpet
    {
        [Key]
        public int CarpetID { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        
        [Required]
        [MaxLength(100)]
        public string Material { get; set; }

        [Required]
        [MaxLength(100)]
        public string Dimensions { get; set; }

        [Required]
        [MaxLength(100)]
        public string Descriptions { get; set; }
        [Required]
        [MaxLength(100)]
        public string Color { get; set; }
        [Required]
        [MaxLength(100)]
        public int AvailableStock { get; set; }

        [Required]
        [MaxLength(100)]
        public string Status { get; set; }

         public DateTime AddedDate { get; set; }
    }
}
