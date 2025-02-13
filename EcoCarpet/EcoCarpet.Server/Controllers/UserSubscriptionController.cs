using EcoCarpet.Server.Data;
using EcoCarpet.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcoCarpet.Server.Controllers
{
    [Route("api/usersubscriptions")]
    [ApiController]
    public class UserSubscriptionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserSubscriptionController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/usersubscriptions/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<UserSubscription>>> GetUserSubscriptions(int userId)
        {
            return await _context.UserSubscriptions
                                 .Where(us => us.UserID == userId)
                                 .Include(us => us.Subscription)
                                 .ToListAsync();
        }

        // POST: api/usersubscriptions
        [HttpPost]
        public async Task<ActionResult<UserSubscription>> CreateUserSubscription(UserSubscription userSubscription)
        {
            userSubscription.EndDate = userSubscription.StartDate.AddYears(1);
            _context.UserSubscriptions.Add(userSubscription);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUserSubscriptions), new { userId = userSubscription.UserID }, userSubscription);
        }

    }
}
