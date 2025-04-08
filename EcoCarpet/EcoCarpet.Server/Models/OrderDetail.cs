using EcoCarpet.Server.Models;
using System.ComponentModel.DataAnnotations;

public class OrderDetail
{
    [Key]
    public int OrderDetailID { get; set; }

    [Required]
    public int OrderID { get; set; }

    [Required]
    public int CarpetID { get; set; }

    [Range(1, 10)]
    public int Quantity { get; set; } = 1;

    // Navigation properties
    public Order Order { get; set; }
    public Carpet Carpet { get; set; }
}
