using EcoCarpet.Server.Data;
using EcoCarpet.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcoCarpet.Server.Controllers
{
    [Route("api/subscriptions")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SubscriptionController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/subscriptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subscription>>> GetSubscriptions()
        {
            return await _context.Subscriptions.ToListAsync();
        }

        // Add suscriptions
        [HttpPost("seed")]
        public async Task<ActionResult<IEnumerable<Subscription>>> SeedSubscriptions()
        {
            var subscriptions = new List<Subscription>
            {
                new Subscription { PlanName = "Gold", AnnualFee = 2000, CarpetLimit = 1, Description = "Basic plan: Includes 1 carpet cleaning per year, access to standard cleaning products, and basic customer support." },
                new Subscription { PlanName = "Diamond", AnnualFee = 5000, CarpetLimit = 3, Description = "Standard plan: Includes up to 3 carpet cleanings per year, access to premium cleaning products, and priority customer support." },
                new Subscription { PlanName = "Platinum", AnnualFee = 7500, CarpetLimit = 5, Description = "Premium plan: Includes up to 5 carpet cleanings per year, access to premium cleaning products, priority customer support, and a dedicated account manager." }
            };
            _context.Subscriptions.AddRange(subscriptions);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSubscriptions), subscriptions);
        }

    }
}
