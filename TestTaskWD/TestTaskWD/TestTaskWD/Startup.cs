// <auto-generated />
namespace TestTaskWD
{
    using System;
    using Microsoft.AspNetCore.Antiforgery;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using TestTaskWD.Configuration;
    using TestTaskWD.Extensions;
    using TestTaskWD.PrivateApi.ShortUrl;
    using TestTaskWD.Proxy.ShortUrlPrivateApi;
    using TestTaskWD.Services;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddHttpClient()
                .AddHttpContextAccessor()
                .AddMemoryCache();

            var config = this.Configuration.GetConfiguration<AppConfiguration>();
            services.AddConfig(config);

            services.AddControllersWithViews();
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/dist"; });
            services.AddAntiforgery(options =>
            {
                options.HeaderName = "X-XSRF-TOKEN";
            });
            services.AddMvc();

            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromHours(24);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
                options.Cookie.Name = ".WdTestTask.Session";
            });

            services
                .AddSingleton<IVaultService, VaultService>();

            services
                .AddTransient<IShortUrlClientFactory, ShortUrlClientFactory>()
                .AddTransient<IShortUrlApiService, ShortUrlApiService>()
                .AddTransient<IShortUrlService, ShortUrlService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAntiforgery antiforgery)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseAntiforgery();
            app.UseUserSession();

            app.UseRouting();

            app.UseSession();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
            });
        }
    }
}