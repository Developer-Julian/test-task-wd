﻿// <auto-generated />
namespace TestTaskWD.WebApi.Authentication
{
    using System.Threading.Tasks;

    internal interface IClientProfileRepository
    {
        Task<ClientProfile> FindProfile(string apiKey);
    }
}