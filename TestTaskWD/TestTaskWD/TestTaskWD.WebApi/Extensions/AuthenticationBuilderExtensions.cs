﻿// <auto-generated />
namespace TestTaskWD.WebApi.Extensions
{
    using System;
    using Microsoft.AspNetCore.Authentication;
    using TestTaskWD.WebApi.Authentication;

    internal static class AuthenticationBuilderExtensions
    {
        public static AuthenticationBuilder AddApiKeyAuthentication(
            this AuthenticationBuilder builder,
            Action<ApiKeyAuthenticationOptions> configureOptions = null)
        {
            return builder.AddScheme<ApiKeyAuthenticationOptions, ApiKeyAuthenticationHandler>("ApiKey", configureOptions);
        }
    }
}