using System.Net.Http.Json;
using FluentAssertions;
using WishListAPI.Models;

namespace WishListAPI.Tests.WishListTests;

public class WishListControllerTests : IClassFixture<OurApiWebFactory>
{
    private readonly OurApiWebFactory _webFactory;

    public WishListControllerTests(OurApiWebFactory webFactory)
    {
        _webFactory = webFactory;
    }

    [Fact]
    public async Task CreateWishList_Should_Create_New_WishList()
    {
        var user = new User { Username = "WishListOwner" };
        var createUserResponse = await _webFactory.Client.PostAsJsonAsync("/api/user", user);
        var createdUser = await createUserResponse.Content.ReadFromJsonAsync<User>();

        var wishList = new WishList
        {
            UserId = createdUser!.UserId
        };

        var createWishListResponse = await _webFactory.Client.PostAsJsonAsync("/api/wishlist", wishList);
        createWishListResponse.EnsureSuccessStatusCode();

        var result = await createWishListResponse.Content.ReadFromJsonAsync<WishList>();
        result.Should().NotBeNull();
        result!.UserId.Should().Be(createdUser.UserId);
    }

    [Fact]
    public async Task GetWishList_Should_Return_Correct_WishList()
    {
        var user = new User { Username = "WishListTester" };
        var createUserResponse = await _webFactory.Client.PostAsJsonAsync("/api/user", user);
        var createdUser = await createUserResponse.Content.ReadFromJsonAsync<User>();

        var wishList = new WishList { UserId = createdUser!.UserId };
        await _webFactory.Client.PostAsJsonAsync("/api/wishlist", wishList);

        var getResponse = await _webFactory.Client.GetAsync($"/api/wishlist/{createdUser.UserId}");
        var fetchedWishList = await getResponse.Content.ReadFromJsonAsync<WishList>();

        fetchedWishList.Should().NotBeNull();
        fetchedWishList!.UserId.Should().Be(createdUser.UserId);
    }
}
