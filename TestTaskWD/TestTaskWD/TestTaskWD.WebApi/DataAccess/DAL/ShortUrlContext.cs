﻿// <auto-generated />
namespace TestTaskWD.WebApi.DataAccess.DAL
{
    using Microsoft.EntityFrameworkCore;
    using TestTaskWD.WebApi.DataAccess.Domain.Entities;

    internal sealed class ShortUrlContext : DbContext
    {
        public ShortUrlContext(DbContextOptions<ShortUrlContext> options)
            : base(options)
        {
        }

        public DbSet<ShortUrlEntity> ShortUrls { get; set; }
    }
}