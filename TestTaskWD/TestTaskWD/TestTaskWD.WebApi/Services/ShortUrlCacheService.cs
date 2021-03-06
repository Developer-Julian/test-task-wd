// <auto-generated />
namespace TestTaskWD.WebApi.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Caching.Memory;
    using TestTaskWD.WebApi.Configuration;
    using TestTaskWD.WebApi.Exceptions;
    using TestTaskWD.WebApi.Models.V1;
    using TestTaskWD.WebApi.Services.Models;

    internal class ShortUrlCacheService : IShortUrlCacheService
    {
        private readonly RedisConfiguration redisConfiguration;
        private readonly IMemoryCache memoryCache;

        public ShortUrlCacheService(RedisConfiguration redisConfiguration, IMemoryCache memoryCache)
        {
            this.redisConfiguration = redisConfiguration;
            this.memoryCache = memoryCache;
        }

        public async Task UpdateUserShortUrlAsync(string userId, List<ShortenUrlModel> shortenUrls)
        {
            if (!this.CheckRedisIsEnabled())
            {
                this.UpdateUserShortUrlInternalMemoryAsync(userId, shortenUrls);
            }

            // TODO: realize redis cache
            await Task.CompletedTask;
        }

        public async Task<List<ShortUrlViewModel>> GetUrlsAsync(string userId, string filterText, string sort, string sortDirection, int skip, int take)
        {
            if (!this.CheckRedisIsEnabled())
            {
                return this.GetUrlsInternalMemoryAsync(
                    userId,
                    filterText,
                    sort,
                    sortDirection,
                    skip,
                    take);
            }

            // TODO: realize redis cache
            return await Task.FromResult(new List<ShortUrlViewModel>());
        }

        public async Task DeleteUrlAsync(string userId, string urlHash)
        {
            if (!this.CheckRedisIsEnabled())
            {
                this.DeleteUrlInternalMemoryAsync(userId, urlHash);
            }

            // TODO: realize redis cache
            await Task.CompletedTask;
        }

        public async Task<int> UpdateUrlAsync(string userId, string urlHash)
        {
            if (!this.CheckRedisIsEnabled())
            {
                return this.UpdateUrlInternalMemoryAsync(userId, urlHash);
            }

            // TODO: realize redis cache
            return await Task.FromResult(0);
        }

        public async Task<int> GetTotalUrlCountAsync(string userId)
        {
            if (!this.CheckRedisIsEnabled())
            {
                return this.GetTotalUrlCountInternalAsync(userId);
            }

            // TODO: realize redis cache
            return await Task.FromResult(0);
        }

        private int GetTotalUrlCountInternalAsync(string userId)
        {
            if (this.memoryCache.TryGetValue<List<ShortenUrlModel>>(userId, out var existedList))
            {
                return existedList.Count;
            }

            return 0;
        }

        private void UpdateUserShortUrlInternalMemoryAsync(string userId, List<ShortenUrlModel> shortenUrls)
        {
            if (this.memoryCache.TryGetValue<List<ShortenUrlModel>>(userId, out var existedList))
            {
                existedList = existedList
                    .Concat(shortenUrls)
                    .GroupBy(x => x.UrlHash)
                    .Select(g => g.First())
                    .ToList();
                this.memoryCache.Set(userId, existedList);
                return;
            }

            this.memoryCache.Set(userId, shortenUrls);
        }

        private List<ShortUrlViewModel> GetUrlsInternalMemoryAsync(string userId, string filterText, string sort, string sortDirection, int skip, int take)
        {
            if (!this.memoryCache.TryGetValue<List<ShortenUrlModel>>(userId, out var existedList))
            {
                throw new ShortUrlNotFoundException(userId);
            }

            var query = existedList.AsEnumerable();
            if (!string.IsNullOrEmpty(filterText))
            {
                query = query.Where(x => x.FullUrl.Contains(filterText) || x.ShortUrl.Contains(filterText));
            }

            object OderByFunc(ShortenUrlModel a) => sort.ToLower() switch
            {
                "fullurl" => a.FullUrl,
                "shorturl" => a.ShortUrl,
                "urlclickcount" => a.ClickCount,
                _ => a.CreatedOn,
            };

            query = sortDirection.ToLower() switch
            {
                "asc" => query.OrderBy(OderByFunc),
                "desc" => query.OrderByDescending(OderByFunc),
                _ => query.OrderBy(OderByFunc),
            };

            return query
                .Skip(skip)
                .Take(take)
                .Select(x => new ShortUrlViewModel
                {
                    FullUrl = x.FullUrl,
                    ShortUrl = x.ShortUrl,
                    UrlHash = x.UrlHash,
                    UrlClickCount = x.ClickCount,
                })
                .ToList();
        }

        private void DeleteUrlInternalMemoryAsync(string userId, string urlHash)
        {
            if (!this.memoryCache.TryGetValue<List<ShortenUrlModel>>(userId, out var existedList))
            {
                throw new ShortUrlNotFoundException(userId, urlHash);
            }

            var url = existedList.FirstOrDefault(x => x.UrlHash == urlHash);
            if (url == null)
            {
                throw new ShortUrlNotFoundException(userId, urlHash);
            }

            existedList.Remove(url);
            this.memoryCache.Set(userId, existedList);
        }

        private int UpdateUrlInternalMemoryAsync(string userId, string urlHash)
        {
            if (!this.memoryCache.TryGetValue<List<ShortenUrlModel>>(userId, out var existedList))
            {
                throw new ShortUrlNotFoundException(userId, urlHash);
            }

            var url = existedList.FirstOrDefault(x => x.UrlHash == urlHash);
            if (url == null)
            {
                throw new ShortUrlNotFoundException(userId, urlHash);
            }

            url.ClickCount++;
            this.memoryCache.Set(userId, existedList);
            return url.ClickCount;
        }

        private bool CheckRedisIsEnabled()
        {
            return this.redisConfiguration.IsEnabled;
        }
    }
}