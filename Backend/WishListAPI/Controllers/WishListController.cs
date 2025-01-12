using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WishListAPI.Data;
using WishListAPI.Models;

namespace WishListAPI.Controllers
{
    [Route("api/wishlist")]
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
                return NotFound("WishList not found.");
            }

            return Ok(wishList);
        }

        [HttpPost]
        public async Task<ActionResult<WishList>> CreateWishList(WishList wishList)
        {
            var userExists = await _context.Users.AnyAsync(u => u.UserId == wishList.UserId);
            if (!userExists)
            {
                return BadRequest("UserId does not exist.");
            }

            _context.WishLists.Add(wishList);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetWishList), new { id = wishList.WishListId }, wishList);
        }
    }
}
