using System.ComponentModel.DataAnnotations;

namespace WishListAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, ErrorMessage = "Username cannot exceed 50 characters")]
        public string Username { get; set; }

        public List<WishList> WishLists { get; set; } = new();
    }
}
