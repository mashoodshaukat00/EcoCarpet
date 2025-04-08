using System.ComponentModel.DataAnnotations;

namespace EcoCarpet.Server.Models
{
    public class Subscription
    {
        [Key]
        public int SubscriptionID { get; set; }

        [Required]
        public string PlanName { get; set; } = string.Empty;

        [Required]
        public decimal AnnualFee { get; set; }

        [Required]
        public int CarpetLimit { get; set; }

        public string? Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime EndDate { get; set; }

        public DateTime? RenewalDate { get; set; }

        [Required]
        public string Status { get; set; } = "Active"; // Active, Expired

        public ICollection<User> Users { get; set; } = new List<User>();    
    }
}
