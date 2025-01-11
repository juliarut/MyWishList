using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WishListAPI.Data;
using WishListAPI.Models;

namespace WishListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WishListItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishListItem>>> GetWishListItems()
        {
            return await _context.WishListItems.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WishListItem>> GetWishListItem(int id)
        {
            var item = await _context.WishListItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        [HttpPost]
        public async Task<ActionResult<WishListItem>> CreateWishListItem(WishListItem wishListItem)
        {
            _context.WishListItems.Add(wishListItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWishListItem), new { id = wishListItem.ItemId }, wishListItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWishListItem(int id, WishListItem wishListItem)
        {
            if (id != wishListItem.ItemId)
            {
                return BadRequest();
            }

            _context.Entry(wishListItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.WishListItems.Any(i => i.ItemId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWishListItem(int id)
        {
            var item = await _context.WishListItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.WishListItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
