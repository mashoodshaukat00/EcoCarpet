using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EcoCarpet.Server.Models
{
    public class UserSubscription
    {
        [Key]
        public int UserSubscriptionID { get; set; }

        [Required]
        public int UserID { get; set; } // FK - User som har abonnementet

        [Required]
        [ForeignKey("Subscription")]
        public int SubscriptionID { get; set; } // FK - Hvilket abonnement

        [Required]
        public DateTime StartDate { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime EndDate { get; set; }

        public DateTime? RenewalDate { get; set; }

        [Required]
        public string Status { get; set; } = "Active"; // Active, Expired, Cancelled

        public int CurrentCarpets { get; set; } = 0;

        public virtual Subscription? Subscription { get; set; } // Relasjon til Subscription
    }
}
