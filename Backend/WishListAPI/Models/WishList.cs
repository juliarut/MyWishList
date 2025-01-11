namespace WishListAPI.Models
{
    public class WishList
    {
        public int WishListId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public List<WishListItem> Items { get; set; } = new();
    }
}
