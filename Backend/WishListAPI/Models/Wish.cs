namespace WishListAPI.Models
{
    public class Wish
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public double Price { get; set; }
        public int WisherId { get; set; }
        public User Wisher { get; set; } = null!;
        public int? PurchaserId { get; set; }
        public User? Purchaser { get; set; }
    }
}
