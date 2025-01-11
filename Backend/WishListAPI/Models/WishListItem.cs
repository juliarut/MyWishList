using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WishListAPI.Models
{
    public class WishListItem
    {
        [Key]
        public int ItemId { get; set; }
        
        public string Name { get; set; }
        public string? Description { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        
        public bool IsPurchased { get; set; }
    }
}
