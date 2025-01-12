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
        public async Task GetUsers_ShouldReturnEmptyList_WhenNoUsersExist()
        {
            // Arrange
            var dbContext = GetDatabaseContext();
            var controller = new UserController(dbContext);

            // Act
            var result = await controller.GetUsers();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<User>>>(result);
            var users = Assert.IsType<List<User>>(actionResult.Value);
            Assert.Empty(users);
        }

        [Fact]
        public async Task CreateUser_ShouldAddUserToDatabase()
        {
            // Arrange
            var dbContext = GetDatabaseContext();
            var controller = new UserController(dbContext);
            var newUser = new User { Username = "TestUser" };

            // Act
            var result = await controller.CreateUser(newUser);
            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);

            // Assert
            Assert.Equal("TestUser", dbContext.Users.First().Username);
            Assert.Equal(201, createdResult.StatusCode);
        }

        [Fact]
        public async Task GetUser_ShouldReturnNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var dbContext = GetDatabaseContext();
            var controller = new UserController(dbContext);

            // Act
            var result = await controller.GetUser(999);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task GetUser_ShouldReturnUser_WhenUserExists()
        {
            // Arrange
            var dbContext = GetDatabaseContext();
            var controller = new UserController(dbContext);
            var newUser = new User { Username = "ExistingUser" };
            await dbContext.Users.AddAsync(newUser);
            await dbContext.SaveChangesAsync();

            // Act
            var result = await controller.GetUser(newUser.UserId);
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            var user = Assert.IsType<User>(actionResult.Value);

            // Assert
            Assert.Equal("ExistingUser", user.Username);
        }
    }
}
