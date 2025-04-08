using EcoCarpet.Server.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Order
{
    [Key]
    public int OrderID { get; set; }  // Primary Key

    [Required]
    public int UserID { get; set; } // Foreign key to User

    public DateTime OrderDate { get; set; }
    public DateTime? DeliveryDate { get; set; }
    public DateTime? ReturnDate { get; set; }

    [Required, MaxLength(50)]
    public string OrderStatus { get; set; } // e.g., Requested, Delivered

    // Optional: Next eligible carpet change date
    public DateTime? NextChangeDate { get; set; }

    // Navigation: Each Order is placed by one User.
    public User User { get; set; }

    // Navigation: One Order can have multiple OrderDetails (i.e., multiple carpets).
    public ICollection<OrderDetail> OrderDetails { get; set; }
}
