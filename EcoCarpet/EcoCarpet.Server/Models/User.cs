using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EcoCarpet.Server.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

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
        [MaxLength(4)]
        
        public string Postalcode { get; set; }

        [Required]
        [MaxLength(100)]
        public string Country { get; set; }

        [Required]
        [MaxLength(8)]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [MaxLength(100)]
        public string PasswordHash { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;

        // Foreign key – each user chooses one subscription plan.
        [Required]
        public int SubscriptionID { get; set; }

        // Navigation to the subscription that the user has chosen.
        [JsonIgnore]
        public Subscription? Subscription { get; set; }
        public ICollection<Payment>? Payments { get; set; }
        public ICollection<Order>? Orders { get; set; }
    }
}
