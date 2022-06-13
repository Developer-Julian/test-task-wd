﻿// <auto-generated />
namespace TestTaskWD.Utility
{
    using System;
    using Microsoft.Extensions.Hosting;

    internal static class EnvironmentHelper
    {
        public static bool IsDevelopment()
        {
            return Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == Environments.Development;
        }

        public static string GetErrorLogDirectoryPath()
        {
            return Environment.GetEnvironmentVariable("STARTUP_ERROR_LOG_FOLDER") ?? string.Empty;
        }
    }
}