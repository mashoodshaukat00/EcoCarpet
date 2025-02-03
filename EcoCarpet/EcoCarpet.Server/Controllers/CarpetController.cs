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
            new Carpet { Name = "Persian Silk Rug", Material = "Silk", Dimensions = "8x10 ft", Color = "Burgundy", Descriptions = "Hand-knotted, intricate design", AvailableStock = 3, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Modern Geometric", Material = "Wool", Dimensions = "5x7 ft", Color = "Grey", Descriptions = "Abstract pattern, contemporary style", AvailableStock = 5, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Shaggy Area Rug", Material = "Acrylic", Dimensions = "3x5 ft", Color = "Beige", Descriptions = "Soft, plush pile", AvailableStock = 10, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Moroccan Trellis", Material = "Cotton", Dimensions = "4x6 ft", Color = "Blue", Descriptions = "Traditional pattern, vibrant colors", AvailableStock = 2, Status = "Rented", AddedDate = DateTime.Now },
            new Carpet { Name = "Hand-Knotted Afghan", Material = "Wool", Dimensions = "9x12 ft", Color = "Red", Descriptions = "Antique, vintage look", AvailableStock = 1, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Bohemian Chic Rug", Material = "Cotton", Dimensions = "6x9 ft", Color = "Indigo", Descriptions = "Eclectic design, vibrant colors", AvailableStock = 7, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Indoor/Outdoor Rug", Material = "Polypropylene", Dimensions = "8x11 ft", Color = "Navy/White", Descriptions = "Durable, weather-resistant", AvailableStock = 2, Status = "Rented", AddedDate = DateTime.Now },
            new Carpet { Name = "Kids Playroom Rug", Material = "Nylon", Dimensions = "4x6 ft", Color = "Multicolor", Descriptions = "Fun patterns, easy to clean", AvailableStock = 10, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Persian Silk Rug", Material = "Silk", Dimensions = "8x10 ft", Color = "Burgundy", Descriptions = "Hand-knotted, intricate design, rich colors, luxurious feel.", AvailableStock = 3, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Modern Geometric Rug", Material = "Wool", Dimensions = "5x7 ft", Color = "Grey", Descriptions = "Abstract pattern, contemporary style, durable, medium pile height.", AvailableStock = 5, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Shaggy Area Rug", Material = "Acrylic", Dimensions = "3x5 ft", Color = "Beige", Descriptions = "Soft, plush pile, great for bedrooms, comfortable underfoot.", AvailableStock = 10, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Moroccan Trellis Rug", Material = "Cotton", Dimensions = "4x6 ft", Color = "Blue", Descriptions = "Traditional pattern, vibrant colors, flatweave, easy to clean.", AvailableStock = 2, Status = "Rented", AddedDate = DateTime.Now },
            new Carpet { Name = "Hand-Knotted Afghan Rug", Material = "Wool", Dimensions = "9x12 ft", Color = "Red", Descriptions = "Antique, vintage look, thick pile, richly textured.", AvailableStock = 1, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Scandinavian Minimalist Rug", Material = "Wool", Dimensions = "6x9 ft", Color = "Ivory", Descriptions = "Simple, minimalist design, low pile, neutral tones.", AvailableStock = 4, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Chunky Knitted Rug", Material = "Cotton", Dimensions = "4x6 ft", Color = "Grey", Descriptions = "Handmade, textured look, cozy feel, chunky knit.", AvailableStock = 6, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Oriental Floral Rug", Material = "Silk", Dimensions = "7x10 ft", Color = "Green", Descriptions = "Intricate floral patterns, luxurious feel, fine weave.", AvailableStock = 2, Status = "Rented", AddedDate = DateTime.Now },
            new Carpet { Name = "Cowhide Rug", Material = "Leather", Dimensions = "5x7 ft", Color = "Brown", Descriptions = "Natural, rustic look, unique texture, genuine cowhide.", AvailableStock = 1, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Abstract Watercolor Rug", Material = "Acrylic", Dimensions = "3x5 ft", Color = "Multicolor", Descriptions = "Modern, artistic design, vibrant colors, low pile.", AvailableStock = 8, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Vintage Persian Medallion Rug", Material = "Wool", Dimensions = "8x11 ft", Color = "Navy Blue", Descriptions = "Classic design, rich colors, intricate details, thick pile.", AvailableStock = 3, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Contemporary Shag Rug", Material = "Polyester", Dimensions = "6x9 ft", Color = "Silver", Descriptions = "Extra soft, high pile, luxurious feel, modern style.", AvailableStock = 7, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Kilim Rug", Material = "Wool", Dimensions = "4x6 ft", Color = "Rust", Descriptions = "Flatweave, geometric patterns, durable, lightweight.", AvailableStock = 5, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Braided Jute Rug", Material = "Jute", Dimensions = "5x8 ft", Color = "Natural", Descriptions = "Eco-friendly, textured surface, rustic look.", AvailableStock = 9, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Faux Fur Rug", Material = "Acrylic", Dimensions = "3x5 ft", Color = "White", Descriptions = "Soft, luxurious feel, plush pile, adds warmth to any room.", AvailableStock = 12, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Round Area Rug", Material = "Cotton", Dimensions = "6 ft", Color = "Teal", Descriptions = "Unique shape, versatile design, adds a pop of color.", AvailableStock = 2, Status = "Rented", AddedDate = DateTime.Now },
            new Carpet { Name = "Sheepskin Rug", Material = "Sheepskin", Dimensions = "4x6 ft", Color = "Cream", Descriptions = "Natural, cozy texture, soft and warm.", AvailableStock = 1, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Trellis Runner Rug", Material = "Cotton", Dimensions = "2.5x8 ft", Color = "Black/White", Descriptions = "Ideal for hallways, stylish pattern, adds visual interest.", AvailableStock = 6, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Overdyed Vintage Rug", Material = "Wool", Dimensions = "7x10 ft", Color = "Emerald Green", Descriptions = "Distressed look, vibrant color, unique character.", AvailableStock = 3, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Southwestern Style Rug", Material = "Wool", Dimensions = "5x7 ft", Color = "Terracotta", Descriptions = "Bold patterns, earthy tones, adds warmth and texture.", AvailableStock = 4, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Bohemian Chic Rug", Material = "Cotton", Dimensions = "6x9 ft", Color = "Indigo", Descriptions = "Eclectic design, vibrant colors, adds personality to any space.", AvailableStock = 7, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Indoor/Outdoor Rug", Material = "Polypropylene", Dimensions = "8x11 ft", Color = "Navy/White", Descriptions = "Durable, weather-resistant, easy to clean, suitable for patios and decks.", AvailableStock = 2, Status = "Rented", AddedDate = DateTime.Now },
            new Carpet { Name = "Kids Playroom Rug", Material = "Nylon", Dimensions = "4x6 ft", Color = "Multicolor", Descriptions = "Fun patterns, easy to clean, durable and comfortable for playtime.", AvailableStock = 10, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Oval Braided Rug", Material = "Jute", Dimensions = "5x7 ft", Color = "Beige", Descriptions = "Rustic charm, textured look, natural fibers.", AvailableStock = 5, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Modern Abstract Art Rug", Material = "Wool/Silk", Dimensions = "7x9 ft", Color = "Grey/Blue", Descriptions = "Contemporary design, artistic flair, luxurious feel.", AvailableStock = 3, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Plush Velvet Rug", Material = "Polyester", Dimensions = "6x8 ft", Color = "Rose", Descriptions = "Soft, luxurious feel, adds elegance to any room.", AvailableStock = 6, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Hand-Woven Dhurrie Rug", Material = "Cotton", Dimensions = "5x7 ft", Color = "Multicolor", Descriptions = "Lightweight, reversible, versatile design.", AvailableStock = 4, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Long Runner Rug", Material = "Wool", Dimensions = "2.5x10 ft", Color = "Red/Black", Descriptions = "Ideal for hallways, bold design, adds a touch of drama.", AvailableStock = 2, Status = "Rented", AddedDate = DateTime.Now },
            new Carpet { Name = "Round Shag Rug", Material = "Acrylic", Dimensions = "7 ft", Color = "White", Descriptions = "Extra soft, cozy texture, perfect for adding warmth and comfort.", AvailableStock = 9, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Braided Wool Rug", Material = "Wool", Dimensions = "5x8 ft", Color = "Natural/Brown", Descriptions = "Durable, handcrafted look, adds rustic charm.", AvailableStock = 3, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Area Rug - Trellis Design", Material = "Polypropylene", Dimensions = "8x10 ft", Color = "Navy/Ivory", Descriptions = "Durable, stain-resistant, suitable for high-traffic areas.", AvailableStock = 7, Status = "Available", AddedDate = DateTime.Now },
            new Carpet { Name = "Frieze Shag Rug", Material = "Polyester", Dimensions = "6x9 ft", Color = "Charcoal", Descriptions = "Thick, textured pile, adds warmth.", AvailableStock = 7, Status = "Available", AddedDate = DateTime.Now },
            };

             _context.Carpets.AddRange(carpets);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"{carpets.Count} carpets seeded successfully." });
        }
    }
}

