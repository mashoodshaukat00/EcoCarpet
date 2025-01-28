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
    public class CustomersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CustomersController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Customers/Register
        [HttpPost("Register")]
        public async Task<ActionResult<Customer>> Register([FromBody] Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if email already exists
            var existingCustomer = await _context.Customers
                .FirstOrDefaultAsync(c => c.Email == customer.Email);
            if (existingCustomer != null)
            {
                return BadRequest("Email is already in use.");
            }

            // Hash the password before saving
            customer.PasswordHash = HashPassword(customer.PasswordHash);

            // Save the new customer to the database
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            // Return created customer
            return CreatedAtAction(nameof(GetCustomer), new { id = customer.CustomerID }, customer);
        }

        // POST: api/Customers/Login
        [HttpPost("Login")]
        public async Task<ActionResult<Customer>> Login([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.Email == loginModel.Email);

            if (customer == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            // Validate password
            if (customer.PasswordHash != HashPassword(loginModel.Password))
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(new { message = "Login successful", customer });
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
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
