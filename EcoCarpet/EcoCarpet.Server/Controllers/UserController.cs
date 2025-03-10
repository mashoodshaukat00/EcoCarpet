using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcoCarpet.Server.Models;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using EcoCarpet.Server.Data;
using System.ComponentModel.DataAnnotations;

namespace EcoCarpet.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }       

        // POST: api/Users/Register
        [HttpPost("Register")]
        public async Task<ActionResult<User>> Register([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Validate that the submitted SubscriptionID corresponds to an existing Subscription.
            var subscriptionID = await _context.Subscriptions.FindAsync(user.SubscriptionID);
            if (subscriptionID == null)
            {
                return BadRequest("Invalid SubscriptionID. Please choose a valid subscription plan.");
            }

            // Check if email already exists
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return BadRequest("Email is already in use.");
            }

            // Hash the password before saving
            user.PasswordHash = HashPassword(user.PasswordHash);

            // Save the new user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Return created user
            return CreatedAtAction(nameof(GetUser), new { id = user.UserID }, user);
        }

        // POST: api/Users/Login
        [HttpPost("Login")]
        public async Task<ActionResult<User>> Login([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(c => c.Email == loginModel.Email);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            // Validate password
            if (user.PasswordHash != HashPassword(loginModel.Password))
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(new { message = "Login successful", user });
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users
                                    .Include(u => u.Subscription)
                                    .FirstOrDefaultAsync(u => u.UserID == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // Updates an existing user.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (id != updatedUser.UserID)
            {
                return BadRequest("User ID mismatch.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Validate the subscription before updating
            var subscription = await _context.Subscriptions.FindAsync(updatedUser.SubscriptionID);
            if (subscription == null)
            {
                return BadRequest("Invalid SubscriptionID. Please choose a valid subscription plan.");
            }

            // Get the existing user from the database.
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            // Update fields. For password update, you might use a separate mechanism; here we assume if a new password is sent, then update.
            existingUser.FirstName = updatedUser.FirstName;
            existingUser.LastName = updatedUser.LastName;
            existingUser.Email = updatedUser.Email;
            existingUser.Address = updatedUser.Address;
            existingUser.City = updatedUser.City;
            existingUser.Postalcode = updatedUser.Postalcode;
            existingUser.Country = updatedUser.Country;
            existingUser.PhoneNumber = updatedUser.PhoneNumber;
            existingUser.SubscriptionID = updatedUser.SubscriptionID;

            // Optionally update password if provided and not empty.
            if (!string.IsNullOrEmpty(updatedUser.PasswordHash))
            {
                existingUser.PasswordHash = HashPassword(updatedUser.PasswordHash);
            }

            _context.Entry(existingUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // DELETE: api/Users/5
        // Deletes a user by their user ID.
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Helper method: Check if a user exists by ID.
        private bool UserExists(int id)
        {
            return _context.Users.Any(u => u.UserID == id);
        }

        // Helper method to hash passwords
        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }

    // Login model to receive email and password from client
    public class LoginModel
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
