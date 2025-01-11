using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Testcontainers.MsSql;
using WishListAPI.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;

namespace WishListAPI.Tests
{
    public class OurApiWebFactory : WebApplicationFactory<Program>, IAsyncLifetime
    {
        public HttpClient Client { get; private set; } = null!;
        private readonly MsSqlContainer _msSqlContainer = new MsSqlBuilder().Build();

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureTestServices(services =>
            {
                services.RemoveAll<DbContextOptions<ApplicationDbContext>>();
                services.RemoveAll<ApplicationDbContext>();
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(_msSqlContainer.GetConnectionString()));
            });
        }

        public async Task InitializeAsync()
        {
            await _msSqlContainer.StartAsync();
            Client = CreateClient();
            using var scope = Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            dbContext.Database.EnsureCreated();
        }

        public override async ValueTask DisposeAsync()
        {
            await _msSqlContainer.DisposeAsync();
        }
    }
}
