﻿// <auto-generated />
namespace TestTaskWD.WebApi.Models.V1
{
    using System.Collections.Generic;

    public class GridOfShortenUrlModel
    {
        public GridOfShortenUrlModel(int total, List<ShortUrlViewModel> shortenUrls)
        {
            this.Total = total;
            this.ShortenUrls = shortenUrls;
        }

        public int Total { get; set; }

        public List<ShortUrlViewModel> ShortenUrls { get; set; }
    }
}