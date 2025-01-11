using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WishListAPI.Models
{
    public class WishListItem
    {
        [Key]
        public int ItemId { get; set; }

        [Required(ErrorMessage = "Item name is required")]
        [StringLength(100, ErrorMessage = "Item name cannot exceed 100 characters")]
        public string Name { get; set; }

        public string? Description { get; set; }

        [Range(0.01, 100000, ErrorMessage = "Price must be a positive value")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public bool IsPurchased { get; set; }
    }
}
