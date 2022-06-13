﻿// <auto-generated />
namespace TestTaskWD.WebApi.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Serilog;
    using TestTaskWD.WebApi.Configuration;
    using TestTaskWD.WebApi.DataAccess.DAL;
    using TestTaskWD.WebApi.Extensions;
    using TestTaskWD.WebApi.Models.V1;

    internal class ShortUrlService : IShortUrlService
    {
        private readonly IShortUrlRepository repository;
        private readonly IUrlShortenerService urlShortenerService;
        private readonly IShortUrlCacheService shortUrlCacheService;
        private readonly ShortUrlConfiguration shortUrlConfiguration;
        private readonly ILogger logger = Log.ForContext<ShortUrlService>();

        public ShortUrlService(
            IShortUrlRepository repository,
            IUrlShortenerService urlShortenerService,
            IShortUrlCacheService shortUrlCacheService,
            ShortUrlConfiguration shortUrlConfiguration)
        {
            this.repository = repository;
            this.urlShortenerService = urlShortenerService;
            this.shortUrlCacheService = shortUrlCacheService;
            this.shortUrlConfiguration = shortUrlConfiguration;
        }

        public async Task<GridOfShortenUrlModel> AddNewBatchUrlAsync(string userId, CreateNewShortUrlRequestModel request)
        {
            try
            {
                var fullUrls = request.FullUrls.Select(x => x.Url).ToList();
                var shortenUrls = await this.urlShortenerService.ShortUrlsAsync(this.shortUrlConfiguration.SiteUrl, userId, fullUrls);
                var listOfTasks = new List<Task>();
                foreach (var shortenUrl in shortenUrls)
                {
                    listOfTasks.Add(this.repository.AddUrlAsync(
                        userId,
                        shortenUrl.FullUrl,
                        shortenUrl.ShortUrl,
                        shortenUrl.UrlHash));
                }

                await Task.WhenAll(listOfTasks);
                await this.repository.CompleteAddingAsync();

                // TODO: realize RabbitMQ/Kafka/Azure Service Bus to update redis cache
                await this.shortUrlCacheService.UpdateUserShortUrlAsync(userId, shortenUrls);
                var result = shortenUrls.Select(x => new ShortUrlViewModel
                {
                    FullUrl = x.FullUrl,
                    ShortUrl = x.ShortUrl,
                    UrlHash = x.UrlHash,
                    UrlClickCount = 0,
                }).ToList();
                var total = await this.shortUrlCacheService.GetTotalUrlCountAsync(userId);
                return new GridOfShortenUrlModel(total, result);
            }
            catch (Exception e)
            {
                this.logger.WithUserId(userId).Error("Error while adding new urls", e);
                throw;
            }
        }

        public async Task<GridOfShortenUrlModel> GetUrlsAsync(string userId, string filterText, string sort, string sortDirection, int skip, int take)
        {
            var total = await this.shortUrlCacheService.GetTotalUrlCountAsync(userId);
            var result = await this.shortUrlCacheService.GetUrlsAsync(
                userId,
                filterText,
                sort,
                sortDirection,
                skip,
                take);
            return new GridOfShortenUrlModel(total, result);
        }

        public async Task DeleteUrlAsync(string userId, string urlHash)
        {
            try
            {
                await this.repository.DeleteUrlAsync(userId, urlHash);
                await this.shortUrlCacheService.DeleteUrlAsync(userId, urlHash);
            }
            catch (Exception e)
            {
                this.logger.WithUserId(userId).Error("Error while deleting new urls", e);
                throw;
            }
        }

        public async Task<int> UpdateClickUrlAsync(string userId, string urlHash)
        {
            try
            {
                await this.repository.UpdateUrlAsync(userId, urlHash);
                var cacheResult = await this.shortUrlCacheService.UpdateUrlAsync(userId, urlHash);

                return cacheResult;
            }
            catch (Exception e)
            {
                this.logger.WithUserId(userId).Error("Error while updating new urls", e);
                throw;
            }
        }
    }
}