﻿// <auto-generated />
namespace TestTaskWD.WebApi.Services
{
    using System.Threading.Tasks;
    using TestTaskWD.WebApi.Models.V1;

    public interface IShortUrlService
    {
        Task<GridOfShortenUrlModel> AddNewBatchUrlAsync(string userId, CreateNewShortUrlRequestModel request);

        Task<GridOfShortenUrlModel> GetUrlsAsync(
            string userId,
            string filterText,
            string sort,
            string sortDirection,
            int skip,
            int take);

        Task DeleteUrlAsync(string userId, string urlHash);

        Task<int> UpdateClickUrlAsync(string userId, string urlHash);
    }
}