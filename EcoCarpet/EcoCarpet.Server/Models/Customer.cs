using System.ComponentModel.DataAnnotations;

namespace EcoCarpet.Server.Models
{
    public class Customer
    {
        [Key]
        public int CustomerID { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(300)]
        public string Address { get; set; }

        [Required]
        [MaxLength(100)]
        public string City { get; set; }

        [Required]
        [MaxLength(100)]
        [RegularExpression(@"^\d{4}$", ErrorMessage = "Invalid Norwegian postal code format.")] // Regex for Norway
        public string Postalcode { get; set; }

        [Required]
        [MaxLength(100)]
        public string Country { get; set; }

        [Required]
        [MaxLength(20)]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [MaxLength(100)]
        public string PasswordHash { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
    }
}
