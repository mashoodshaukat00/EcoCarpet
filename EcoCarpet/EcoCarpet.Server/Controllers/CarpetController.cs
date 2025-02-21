using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using EcoCarpet.Server.Data;
using EcoCarpet.Server.Models;


namespace EcoCarpet.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarpetController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CarpetController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost("seed")] // Example route: api/carpets/seed
        public async Task<IActionResult> SeedCarpets()
        {
            var carpets = new List<Carpet>
        {
           new Carpet { Name = "Persian Silk Rug", Material = "Silk", Dimensions = "8x10 ft", Color = "Burgundy", Descriptions = "Hand-knotted, intricate design", AvailableStock = 3, Status = "Available", AddedDate = DateTime.Now,ImgName = "persian_silk_rug" },
            new Carpet { Name = "Modern Geometric", Material = "Wool", Dimensions = "5x7 ft", Color = "Grey", Descriptions = "Abstract pattern, contemporary style", AvailableStock = 5, Status = "Available", AddedDate = DateTime.Now,ImgName = "modern_geometric" },
            new Carpet { Name = "Shaggy Area Rug", Material = "Acrylic", Dimensions = "3x5 ft", Color = "Beige", Descriptions = "Soft, plush pile", AvailableStock = 10, Status = "Available", AddedDate = DateTime.Now,ImgName = "shaggy_area_rug" },
            new Carpet { Name = "Moroccan Trellis", Material = "Cotton", Dimensions = "4x6 ft", Color = "Blue", Descriptions = "Traditional pattern, vibrant colors", AvailableStock = 2, Status = "Rented", AddedDate = DateTime.Now,ImgName = "moroccan_trellis" },
            new Carpet { Name = "Hand-Knotted Afghan", Material = "Wool", Dimensions = "9x12 ft", Color = "Red", Descriptions = "Antique, vintage look", AvailableStock = 1, Status = "Available", AddedDate = DateTime.Now,ImgName = "hand_knotted_afghan" },
            new Carpet { Name = "Bohemian Chic Rug", Material = "Cotton", Dimensions = "6x9 ft", Color = "Indigo", Descriptions = "Eclectic design, vibrant colors", AvailableStock = 7, Status = "Available", AddedDate = DateTime.Now,ImgName = "bohemian_chic_rug" },
            new Carpet { Name = "Indoor/Outdoor Rug", Material = "Polypropylene", Dimensions = "8x11 ft", Color = "Navy/White", Descriptions = "Durable, weather-resistant", AvailableStock = 2, Status = "Rented", AddedDate = DateTime.Now,ImgName = "indoor_outdoor_rug" },
            new Carpet { Name = "Kids Playroom Rug", Material = "Nylon", Dimensions = "4x6 ft", Color = "Multicolor", Descriptions = "Fun patterns, easy to clean", AvailableStock = 10, Status = "Available", AddedDate = DateTime.Now,ImgName = "kids_playroom_rug" },
            new Carpet { Name = "Modern Geometric Rug", Material = "Wool", Dimensions = "5x7 ft", Color = "Grey", Descriptions = "Abstract pattern, contemporary style, durable, medium pile height.", AvailableStock = 5, Status = "Available", AddedDate = DateTime.Now,ImgName = "modern_geometric_rug" },
            new Carpet { Name = "Shaggy Area Rug 2", Material = "Acrylic", Dimensions = "3x5 ft", Color = "Beige", Descriptions = "Soft, plush pile, great for bedrooms, comfortable underfoot.", AvailableStock = 10, Status = "Available", AddedDate = DateTime.Now,ImgName = "shaggy_area_rug_2" },
            new Carpet { Name = "Moroccan Trellis Rug 2", Material = "Cotton", Dimensions = "4x6 ft", Color = "Blue", Descriptions = "Traditional pattern, vibrant colors, flatweave, easy to clean.", AvailableStock = 2, Status = "Rented", AddedDate = DateTime.Now,ImgName = "moroccan_trellis_rug_2" },
            new Carpet { Name = "Hand-Knotted Afghan Rug 2", Material = "Wool", Dimensions = "9x12 ft", Color = "Red", Descriptions = "Antique, vintage look, thick pile, richly textured.", AvailableStock = 1, Status = "Available", AddedDate = DateTime.Now,ImgName = "hand_knotted_afghan_rug_2" },
            new Carpet { Name = "Scandinavian Minimalist Rug", Material = "Wool", Dimensions = "6x9 ft", Color = "Ivory", Descriptions = "Simple, minimalist design, low pile, neutral tones.", AvailableStock = 4, Status = "Available", AddedDate = DateTime.Now,ImgName = "scandinavian_minimalist_rug" },
            new Carpet { Name = "Chunky Knitted Rug", Material = "Cotton", Dimensions = "4x6 ft", Color = "Grey", Descriptions = "Handmade, textured look, cozy feel, chunky knit.", AvailableStock = 6, Status = "Available", AddedDate = DateTime.Now,ImgName = "chunky_knitted_rug" },
            new Carpet { Name = "Oriental Floral Rug", Material = "Silk", Dimensions = "7x10 ft", Color = "Green", Descriptions = "Intricate floral patterns, luxurious feel, fine weave.", AvailableStock = 2, Status = "Rented", AddedDate = DateTime.Now,ImgName = "oriental_floral_rug" },
            new Carpet { Name = "Cowhide Rug", Material = "Leather", Dimensions = "5x7 ft", Color = "Brown", Descriptions = "Natural, rustic look, unique texture, genuine cowhide.", AvailableStock = 1, Status = "Available", AddedDate = DateTime.Now,ImgName = "cowhide_rug" },
            new Carpet { Name = "Abstract Watercolor Rug", Material = "Acrylic", Dimensions = "3x5 ft", Color = "Multicolor", Descriptions = "Modern, artistic design, vibrant colors, low pile.", AvailableStock = 8, Status = "Available", AddedDate = DateTime.Now,ImgName = "abstract_watercolor_rug" },
            new Carpet { Name = "Vintage Persian Medallion Rug", Material = "Wool", Dimensions = "8x11 ft", Color = "Navy Blue", Descriptions = "Classic design, rich colors, intricate details, thick pile.", AvailableStock = 3, Status = "Available", AddedDate = DateTime.Now,ImgName = "vintage_persian_medallion_rug" },
            new Carpet { Name = "Contemporary Shag Rug", Material = "Polyester", Dimensions = "6x9 ft", Color = "Silver", Descriptions = "Extra soft, high pile, luxurious feel, modern style.", AvailableStock = 7, Status = "Available", AddedDate = DateTime.Now,ImgName = "contemporary_shag_rug" },
            new Carpet { Name = "Kilim Rug", Material = "Wool", Dimensions = "4x6 ft", Color = "Rust", Descriptions = "Flatweave, geometric patterns, durable, lightweight.", AvailableStock = 5, Status = "Available", AddedDate = DateTime.Now,ImgName = "kilim_rug" },
            new Carpet { Name = "Braided Jute Rug", Material = "Jute", Dimensions = "5x8 ft", Color = "Natural", Descriptions = "Eco-friendly, textured surface, rustic look.", AvailableStock = 9, Status = "Available", AddedDate = DateTime.Now,ImgName = "braided_jute_rug" },
            new Carpet { Name = "Faux Fur Rug", Material = "Acrylic", Dimensions = "3x5 ft", Color = "White", Descriptions = "Soft, luxurious feel, plush pile, adds warmth to any room.", AvailableStock = 12, Status = "Available", AddedDate = DateTime.Now,ImgName = "faux_fur_rug" },
            new Carpet { Name = "Round Area Rug 2", Material = "Cotton", Dimensions = "6 ft", Color = "Teal", Descriptions = "Unique shape, versatile design, adds a pop of color.", AvailableStock = 2, Status = "Rented", AddedDate = DateTime.Now,ImgName = "round_area_rug_2" },
            new Carpet { Name = "Sheepskin Rug", Material = "Sheepskin", Dimensions = "4x6 ft", Color = "Cream", Descriptions = "Natural, cozy texture, soft and warm.", AvailableStock = 1, Status = "Available", AddedDate = DateTime.Now,ImgName = "sheepskin_rug" },
            };

            _context.Carpets.AddRange(carpets);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"{carpets.Count} carpets seeded successfully." });
        }

       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carpet>>> GetCarpets()
        {
            return await _context.Carpets.ToListAsync();
        }

        // ✅ Get Carpets with Filtering
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Carpet>>> GetFilteredCarpets(
            [FromQuery] string? material,
            [FromQuery] string? color,
            [FromQuery] string? dimensions,
            [FromQuery] string? status)
        {
            var query = _context.Carpets.AsQueryable();

            if (!string.IsNullOrEmpty(material))
                query = query.Where(c => c.Material == material);

            if (!string.IsNullOrEmpty(color))
                query = query.Where(c => c.Color == color);

            if (!string.IsNullOrEmpty(dimensions))
                query = query.Where(c => c.Dimensions == dimensions);

            if (!string.IsNullOrEmpty(status))
                query = query.Where(c => c.Status == status);

            var result = await query.ToListAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Carpet>> GetCarpet(int id)
        {
            var carpet = await _context.Carpets.FindAsync(id);
            if (carpet == null)
            {
                return NotFound();
            }
            return Ok(carpet);
        }

    }
}

