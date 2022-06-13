﻿// <auto-generated />
namespace TestTaskWD.WebApi.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using TestTaskWD.WebApi.Models.V1;
    using TestTaskWD.WebApi.Services.Models;

    internal interface IShortUrlCacheService
    {
        Task UpdateUserShortUrlAsync(string userId, List<ShortenUrlModel> shortenUrls);

        Task<List<ShortUrlViewModel>> GetUrlsAsync(string userId, string filterText, string sort, string sortDirection, int skip, int take);

        Task DeleteUrlAsync(string userId, string urlHash);

        Task<int> UpdateUrlAsync(string userId, string urlHash);

        Task<int> GetTotalUrlCountAsync(string userId);
    }
}