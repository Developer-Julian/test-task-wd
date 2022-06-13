﻿// <auto-generated />
namespace TestTaskWD.WebApi.Extensions
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Http;

    public static class WebPingExtensions
    {
        public static IApplicationBuilder UseWebPing(this IApplicationBuilder app)
        {
            return app.Map("/webping", WebPing);
        }

        private static void WebPing(IApplicationBuilder app)
        {
            app.Run(
                context =>
                {
                    context.Response.ContentType = "text/html";
                    return context.Response.WriteAsync("Success");
                });
        }
    }
}