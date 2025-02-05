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
    }
}
