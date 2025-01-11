using System.ComponentModel.DataAnnotations;

namespace WishListAPI.Models
{
    public class WishList
    {
        [Key]
        public int WishListId { get; set; }

        [Required(ErrorMessage = "UserId is required")]
        public int UserId { get; set; }

        public User? User { get; set; }

        public List<WishListItem> Items { get; set; } = new();
    }
}
