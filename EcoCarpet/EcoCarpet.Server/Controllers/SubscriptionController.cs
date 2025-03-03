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
        // Returns all subscriptions (including related users, if any)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subscription>>> GetSubscriptions()
        {
            return await _context.Subscriptions
                                 .Include(s => s.Users)
                                 .ToListAsync();
        }

        // GET: api/subscriptions/{id}
        // Returns a specific subscription by id.
        [HttpGet("{id}")]
        public async Task<ActionResult<Subscription>> GetSubscription(int id)
        {
            var subscription = await _context.Subscriptions
                                             .Include(s => s.Users)
                                             .FirstOrDefaultAsync(s => s.SubscriptionID == id);
            if (subscription == null)
            {
                return NotFound();
            }
            return subscription;
        }

        // POST: api/subscriptions
        // Creates a new subscription. If EndDate isn't set, defaults to one year from StartDate.
        [HttpPost]
        public async Task<ActionResult<Subscription>> CreateSubscription(Subscription subscription)
        {
            if (subscription.EndDate == default)
            {
                subscription.EndDate = subscription.StartDate.AddYears(1);
            }

            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetSubscription),
                new { id = subscription.SubscriptionID },
                subscription);
        }

        // PUT: api/subscriptions/{id}
        // Updates an existing subscription by id.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubscription(int id, Subscription subscription)
        {
            if (id != subscription.SubscriptionID)
            {
                return BadRequest("Subscription ID mismatch.");
            }

            _context.Entry(subscription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/subscriptions/{id}
        // Deletes a subscription by id.
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubscription(int id)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);
            if (subscription == null)
            {
                return NotFound();
            }

            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/subscriptions/seed
        // Populates the subscription table with three predefined subscription types: Gold, Diamond, and Platinum.
        [HttpPost("seed")]
        public async Task<ActionResult<IEnumerable<Subscription>>> SeedSubscriptions()
        {
            // Prevent seeding if subscriptions already exist.
            if (await _context.Subscriptions.AnyAsync())
            {
                return BadRequest("Subscriptions have already been seeded.");
            }

            var subscriptions = new List<Subscription>
            {
                new Subscription
                {
                    PlanName = "Gold",
                    AnnualFee = 2000m,
                    CarpetLimit = 1,
                    Description = "Basic plan: 1 carpet cleaning per year, standard cleaning products, and basic support.",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddYears(1),
                    Status = "Active"
                },
                new Subscription
                {
                    PlanName = "Diamond",
                    AnnualFee = 5000m,
                    CarpetLimit = 3,
                    Description = "Standard plan: Up to 3 carpet cleanings per year, premium cleaning products, and priority support.",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddYears(1),
                    Status = "Active"
                },
                new Subscription
                {
                    PlanName = "Platinum",
                    AnnualFee = 7500m,
                    CarpetLimit = 5,
                    Description = "Premium plan: Up to 5 carpet cleanings per year, premium cleaning products, priority support, and a dedicated account manager.",
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddYears(1),
                    Status = "Active"
                }
            };

            _context.Subscriptions.AddRange(subscriptions);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSubscriptions), subscriptions);
        }

        // POST: api/subscriptions/{subscriptionId}/users/{userId}
        // Associates a user with a subscription.
        [HttpPost("{subscriptionId}/users/{userId}")]
        public async Task<IActionResult> AddUserToSubscription(int subscriptionId, int userId)
        {
            var subscription = await _context.Subscriptions
                                             .Include(s => s.Users)
                                             .FirstOrDefaultAsync(s => s.SubscriptionID == subscriptionId);
            if (subscription == null)
            {
                return NotFound($"Subscription with ID {subscriptionId} not found.");
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound($"User with ID {userId} not found.");
            }

            // Add the user to the subscription's Users collection.
            subscription.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(subscription);
        }

        // Helper method to check if a subscription exists.
        private bool SubscriptionExists(int id)
        {
            return _context.Subscriptions.Any(s => s.SubscriptionID == id);
        }
    }
}
