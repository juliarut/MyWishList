using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WishListAPI.Data;
using WishListAPI.Models;

namespace WishListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WishListController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WishList>>> GetWishLists()
        {
            return await _context.WishLists.Include(w => w.Items).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WishList>> GetWishList(int id)
        {
            var wishList = await _context.WishLists.Include(w => w.Items)
                .FirstOrDefaultAsync(w => w.WishListId == id);

            if (wishList == null)
            {
                return NotFound();
            }

            return wishList;
        }

        [HttpPost]
        public async Task<ActionResult<WishList>> CreateWishList(WishList wishList)
        {
            _context.WishLists.Add(wishList);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWishList), new { id = wishList.WishListId }, wishList);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWishList(int id, WishList wishList)
        {
            if (id != wishList.WishListId)
            {
                return BadRequest();
            }

            _context.Entry(wishList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.WishLists.Any(w => w.WishListId == id))
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
        public async Task<IActionResult> DeleteWishList(int id)
        {
            var wishList = await _context.WishLists.FindAsync(id);
            if (wishList == null)
            {
                return NotFound();
            }

            _context.WishLists.Remove(wishList);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
