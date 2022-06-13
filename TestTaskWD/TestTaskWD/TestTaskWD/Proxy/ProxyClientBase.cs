﻿// <auto-generated />
namespace TestTaskWD.Proxy
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    internal abstract class ProxyClientBase
    {
        private readonly ProxyClientConfiguration configuration;

        private readonly IProxySerializer serializer;

        private readonly IProxyHttpClient httpClient;

        protected ProxyClientBase(
            ProxyClientConfiguration configuration,
            IProxySerializer serializer,
            IProxyHttpClient httpClient)
        {
            this.configuration = configuration;
            this.serializer = serializer;
            this.httpClient = httpClient;
        }

        protected T Deserialize<T>(byte[] serialized) => this.serializer.Deserialize<T>(serialized);

        protected T DeserializeObject<T>(byte[] serialized) => this.serializer.DeserializeObject<T>(serialized);

        protected byte[] Serialize<T>(T obj) => this.serializer.Serialize(obj);

        protected Task<byte[]> ApplyAsync(ProxyRequestDefinition definition)
        {
            definition.Headers.Add(new KeyValuePair<string, string>("Content-Type", "application/json"));
            definition.Url = this.configuration.ApiBaseUrl.TrimEnd('/') + '/' + definition.Url.TrimStart('/');

            return this.httpClient.ApplyAsync(definition);
        }
    }
}
