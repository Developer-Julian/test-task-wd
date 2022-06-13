﻿// <auto-generated />
namespace TestTaskWD.Logging
{
    using System;
    using Microsoft.Extensions.Hosting;
    using Serilog;

    internal static class HostBuilderLoggingExtensions
    {
        public static IHostBuilder ConfigureSerilog(this IHostBuilder builder) =>
            builder.UseSerilog(ConfigureSerilogInternal);

        private static void ConfigureSerilogInternal(
            HostBuilderContext context,
            LoggerConfiguration loggerConfig)
        {
            var isDevelopment = context.HostingEnvironment.IsDevelopment();
            if (isDevelopment)
            {
                ConfigureWriteToConsole(loggerConfig);
            }

            // TODO: realize elastik config
        }

        private static void ConfigureWriteToConsole(LoggerConfiguration loggerConfig)
        {
            loggerConfig.WriteTo.Console(
                outputTemplate: "[{Timestamp:O} {ApplicationLevel}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}");
        }
    }
}