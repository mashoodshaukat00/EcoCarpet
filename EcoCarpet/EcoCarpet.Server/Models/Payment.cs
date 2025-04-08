using EcoCarpet.Server.Models;

public class Payment
{
    public int PaymentID { get; set; }  // PK

    public int UserID { get; set; }
    public User User { get; set; }

    // Payment details
    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public string PaymentMethod { get; set; }
    public string Status { get; set; }
}
