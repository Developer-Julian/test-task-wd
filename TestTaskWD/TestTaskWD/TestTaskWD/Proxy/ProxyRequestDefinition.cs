﻿// <auto-generated />
namespace TestTaskWD.Proxy
{
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Http;

    internal sealed class ProxyRequestDefinition
    {
        public string Url { get; set; } = string.Empty;

        public string Method { get; set; } = HttpMethods.Get;

        public IDictionary<string, string> Headers { get; set; } = new Dictionary<string, string>();

        public byte[] Body { get; set; }
    }
}