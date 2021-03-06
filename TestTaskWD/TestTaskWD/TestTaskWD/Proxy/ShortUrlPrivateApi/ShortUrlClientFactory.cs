// <auto-generated />
namespace TestTaskWD.Proxy.ShortUrlPrivateApi
{
    using System.Net.Http;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Caching.Memory;
    using Serilog;
    using TestTaskWD.Configuration;
    using TestTaskWD.Configuration.Vault;
    using TestTaskWD.Services;

    internal sealed class ShortUrlClientFactory : AuthenticatedProxyClientFactoryBase, IShortUrlClientFactory
    {
        public ShortUrlClientFactory(
            ServiceConfiguration serviceConfiguration,
            IHttpClientFactory httpClientFactory,
            VaultConfiguration vaultConfiguration,
            IVaultService vaultService,
            IMemoryCache memoryCache)
            : base(serviceConfiguration, httpClientFactory, vaultConfiguration, vaultService, memoryCache)
        {
            this.VaultApiKeySuffix = serviceConfiguration.ShortUrlPrivateApi.VaultPathApi;
        }

        protected override ILogger Logger { get; } = Log.ForContext<ShortUrlClientFactory>();

        public async Task<IShortUrlClient> CreateShortUrlClientAsync()
        {
            return new ShortUrlClient(
                await this.CreateAuthenticatedProxyConfigurationAsync(GetApiBaseUrl),
                this.CreateProxySerializer(),
                this.CreateProxyHttpClient());
        }

        private static string GetApiBaseUrl(ServiceConfiguration config) => config.ShortUrlPrivateApi.Uri;
    }
}