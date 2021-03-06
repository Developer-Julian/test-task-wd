// <auto-generated />
namespace TestTaskWD.Proxy.ShortUrlPrivateApi
{
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using TestTaskWD.Exceptions;
    using TestTaskWD.Models;
    using TestTaskWD.Proxy.Exceptions;

    internal sealed class ShortUrlClient : AuthenticatedProxyClientBase, IShortUrlClient
    {
        public ShortUrlClient(
            AuthenticatedProxyClientConfiguration configuration,
            IProxySerializer serializer,
            IProxyHttpClient httpClient)
            : base(configuration, serializer, httpClient)
        {
        }

        public async Task<GridOfShortenUrlModel> AddNewBatchUrlAsync(CreateNewShortUrlRequestModel request, string userGuid)
        {
            var url = $"/v1/short-url/short/{userGuid}";
            var definition = new ProxyRequestDefinition
            {
                Url = url,
                Method = HttpMethod.Post.Method,
                Body = this.Serialize(request)
            };

            var response = await this.ApplyAsync(definition);
            var deserializationResponse = this.DeserializeObject<GridOfShortenUrlModel>(response);
            return deserializationResponse;
        }

        public async Task<GridOfShortenUrlModel> GetUrlsAsync(string userGuid, string filterText, string sort, string sortDirection, int skip, int take)
        {
            var url = $"/v1/short-url/short/{userGuid}?filterText={filterText}&sort={sort}&sortDirection={sortDirection}&skip={skip}&take={take}";
            var definition = new ProxyRequestDefinition
            {
                Url = url,
                Method = HttpMethod.Get.Method,
            };

            var response = await ExecuteNotFoundAsync(() => this.ApplyAsync(definition));
            var deserializationResponse = this.DeserializeObject<GridOfShortenUrlModel>(response);
            return deserializationResponse;
        }

        public async Task DeleteUrlAsync(string urlHash, string userGuid)
        {
            var url = $"/v1/short-url/short/{userGuid}/{urlHash}";
            var definition = new ProxyRequestDefinition
            {
                Url = url,
                Method = HttpMethod.Delete.Method,
            };

            await ExecuteNotFoundAsync(() => this.ApplyAsync(definition));
        }

        public async Task<int> UpdateClickUrlAsync(string urlHash, string userGuid)
        {
            var url = $"/v1/short-url/short/{userGuid}/{urlHash}";
            var definition = new ProxyRequestDefinition
            {
                Url = url,
                Method = HttpMethod.Put.Method,
            };

            var response = await ExecuteNotFoundAsync(() => this.ApplyAsync(definition));
            var deserializationResponse = this.DeserializeObject<int>(response);
            return deserializationResponse;
        }

        private static async Task<byte[]> ExecuteNotFoundAsync(Func<Task<byte[]>> task)
        {
            try
            {
                var response = await task.Invoke();
                return response;
            }
            catch (RequestException e)
            {
                if (e.StatusCode == HttpStatusCode.NotFound)
                {
                    throw new ShortUrlNotFoundException();
                }

                throw;
            }
        }
    }
}