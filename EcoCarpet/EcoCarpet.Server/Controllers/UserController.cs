using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcoCarpet.Server.Models;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using EcoCarpet.Server.Data;

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
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
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
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
