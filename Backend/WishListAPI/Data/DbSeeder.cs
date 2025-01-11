using WishListAPI.Models;

namespace WishListAPI.Data
{
    public static class DbSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            if (!context.Users.Any())
            {
                var users = new List<User>
                {
                    new User { Username = "Alice" },
                    new User { Username = "Amanda" }
                };
                context.Users.AddRange(users);
                context.SaveChanges();
            }

            if (!context.WishLists.Any())
            {
                var wishLists = new List<WishList>
                {
                    new WishList 
                    { 
                        UserId = context.Users.First().UserId, 
                        Items = new List<WishListItem>
                        {
                            new WishListItem { Name = "Laptop", Price = 1000m, IsPurchased = false },
                            new WishListItem { Name = "Headphones", Price = 200m, IsPurchased = false }
                        }
                    }
                };
                context.WishLists.AddRange(wishLists);
                context.SaveChanges();
            }
        }
    }
}
