﻿// <auto-generated />
namespace TestTaskWD.WebApi.Extensions
{
    using Serilog;

    internal static class LoggerExtension
    {
        public static ILogger WithUserId(this ILogger logger, string userId)
        {
            var result = logger
                .ForContext("UserId", userId);

            return result;
        }

        public static ILogger WithUrlHash(this ILogger logger, string urlHash)
        {
            var result = logger
                .ForContext("UrlHash", urlHash);

            return result;
        }
    }
}