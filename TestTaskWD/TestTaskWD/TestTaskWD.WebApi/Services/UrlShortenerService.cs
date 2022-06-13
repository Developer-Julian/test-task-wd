﻿// <auto-generated />

using System.Linq;

namespace TestTaskWD.WebApi.Services
{
    using System;
    using System.Collections.Generic;
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading.Tasks;
    using TestTaskWD.WebApi.Services.Models;

    internal class UrlShortenerService : IUrlShortenerService
    {
        public async Task<List<ShortenUrlModel>> ShortUrlsAsync(string siteUrl, string userId, List<string> fullUrls)
        {
            var result = new List<ShortenUrlModel>();
            var hashTasks = new List<Task>();
            foreach (var fullUrl in fullUrls.Distinct())
            {
                hashTasks.Add(Task.Run(() =>
                {
                    var urlHash = this.GetHashString($"{userId}_{fullUrl}");
                    result.Add(new ShortenUrlModel
                    {
                        FullUrl = fullUrl,
                        UrlHash = urlHash,
                        ShortUrl = $"{siteUrl}/{urlHash}",
                        CreatedOn = DateTime.Now,
                    });
                }));
            }

            await Task.WhenAll(hashTasks);

            return result;
        }

        private byte[] GetHash(string inputString)
        {
            using HashAlgorithm algorithm = SHA256.Create();
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        private string GetHashString(string inputString)
        {
            var sb = new StringBuilder();
            foreach (var b in this.GetHash(inputString))
            {
                sb.Append(b.ToString("X2"));
            }

            return sb.ToString().Substring(0, 10);
        }
    }
}