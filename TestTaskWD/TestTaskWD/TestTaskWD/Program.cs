// <auto-generated />
namespace TestTaskWD
{
    using System;
    using System.IO;
    using System.Reflection;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Hosting;
    using Serilog;
    using Serilog.Debugging;
    using Serilog.Events;
    using TestTaskWD.Logging;
    using TestTaskWD.Utility;

    public class Program
    {
        public static int Main(string[] args)
        {
            if (EnvironmentHelper.IsDevelopment())
            {
                SelfLog.Enable(Console.WriteLine);
            }

            try
            {
                Host.CreateDefaultBuilder(args)
                    .ConfigureSerilog()
                    .ConfigureWebHostDefaults(webHostBuilder =>
                    {
                        webHostBuilder.UseStartup<Startup>();
                    })
                    .Build()
                    .Run();

                return 0;
            }
            catch (Exception ex)
            {
                ConfigureErrorLog();
                Log.Fatal(ex, "Host terminated unexpectedly");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        private static void ConfigureErrorLog()
        {
            var loggerConfiguration = new LoggerConfiguration()
                .Enrich.FromLogContext();

            if (EnvironmentHelper.IsDevelopment())
            {
                loggerConfiguration.WriteTo.Console();
            }

            var startupErrorLogFileName = Path.Combine(
                EnvironmentHelper.GetErrorLogDirectoryPath(),
                Assembly.GetExecutingAssembly().GetName().Name + ".startup-error.log");
            loggerConfiguration.WriteTo.File(startupErrorLogFileName, LogEventLevel.Fatal);

            Log.Logger = loggerConfiguration.CreateLogger();
        }
    }
}