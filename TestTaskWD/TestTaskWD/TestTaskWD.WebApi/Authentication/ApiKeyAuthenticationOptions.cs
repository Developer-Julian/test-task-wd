﻿// <auto-generated />
namespace TestTaskWD.WebApi.Authentication
{
    using Microsoft.AspNetCore.Authentication;

    internal class ApiKeyAuthenticationOptions : AuthenticationSchemeOptions
    {
        public string ClientIdClaimType { get; set; } = "sub";

        public string DisplayNameClaimType { get; set; } = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
    }
}