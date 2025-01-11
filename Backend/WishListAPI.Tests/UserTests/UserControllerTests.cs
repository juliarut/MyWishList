using Xunit;
using WishListAPI.Controllers;
using WishListAPI.Models;
using WishListAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace WishListAPI.Tests.UserTests
{
    public class UserControllerTests
    {
        private ApplicationDbContext GetDatabaseContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var dbContext = new ApplicationDbContext(options);
            dbContext.Database.EnsureCreated();
            return dbContext;
        }

        [Fact]
        public async Task GetUsers_ReturnsEmptyList_WhenNoUsersExist()
        {
            var dbContext = GetDatabaseContext();
            var controller = new UserController(dbContext);

            var result = await controller.GetUsers();

            var actionResult = Assert.IsType<ActionResult<IEnumerable<User>>>(result);
            var users = Assert.IsType<List<User>>(actionResult.Value);
            Assert.Empty(users);
        }

        [Fact]
        public async Task CreateUser_AddsUserToDatabase()
        {
            var dbContext = GetDatabaseContext();
            var controller = new UserController(dbContext);
            var newUser = new User { Username = "TestUser" };

            var result = await controller.CreateUser(newUser);

            var actionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.Equal("TestUser", dbContext.Users.First().Username);
        }

        [Fact]
        public async Task GetUser_ReturnsNotFound_WhenUserDoesNotExist()
        {
            var dbContext = GetDatabaseContext();
            var controller = new UserController(dbContext);

            var result = await controller.GetUser(999);

            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}
