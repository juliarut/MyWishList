using System.Net.Http.Json;
using FluentAssertions;
using WishListAPI.Models;
using Xunit;

namespace WishListAPI.Tests.WishListTests
{
    public class WishListControllerTests : IClassFixture<OurApiWebFactory>
    {
        private readonly OurApiWebFactory _webFactory;

        public WishListControllerTests(OurApiWebFactory webFactory)
        {
            _webFactory = webFactory;
        }

    //    { {[Fact]
    //     public async Task CreateWishList_Should_Create_New_WishList()
    //     {
    //         // Arrange
    //         var user = new User { Username = "TestUser" };
    //         var createUserResponse = await _webFactory.Client.PostAsJsonAsync("/api/users", user);
    //         createUserResponse.EnsureSuccessStatusCode();
    //         var createdUser = await createUserResponse.Content.ReadFromJsonAsync<User>();

    //         var wishList = new WishList { UserId = createdUser!.UserId };

    //         // Act
    //         var createResponse = await _webFactory.Client.PostAsJsonAsync("/api/wishlist", wishList);
            
    //         // Assert
    //         createResponse.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
    //     }}}

        // [Fact]
        // public async Task GetWishList_Should_Return_Correct_WishList()
        // {
        //     // Arrange
        //     var user = new User { Username = "TestUser" };
        //     var createUserResponse = await _webFactory.Client.PostAsJsonAsync("/api/users", user);
        //     createUserResponse.EnsureSuccessStatusCode();
        //     var createdUser = await createUserResponse.Content.ReadFromJsonAsync<User>();

        //     var wishList = new WishList { UserId = createdUser!.UserId };
        //     var createResponse = await _webFactory.Client.PostAsJsonAsync("/api/wishlist", wishList);
        //     createResponse.EnsureSuccessStatusCode();

        //     // Act
        //     var getResponse = await _webFactory.Client.GetAsync($"/api/wishlist/{createdUser.UserId}");
        //     var fetchedWishList = await getResponse.Content.ReadFromJsonAsync<WishList>();

        //     // Assert
        //     fetchedWishList.Should().NotBeNull();
        // }
    }
}
