namespace WishListAPI.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public List<WishList> WishLists { get; set; } = new();
    }
}