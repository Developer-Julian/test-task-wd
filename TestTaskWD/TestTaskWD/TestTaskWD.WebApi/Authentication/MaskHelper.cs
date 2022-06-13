﻿// <auto-generated />
namespace TestTaskWD.WebApi.Authentication
{
    public static class MaskHelper
    {
        public static string MaskApiKey(string apiKey)
        {
            int length = apiKey.Length;
            return length >= 3
                ? (length >= 5
                    ? apiKey.Substring(0, 2) + "***" + apiKey.Substring(apiKey.Length - 2)
                    : apiKey.Substring(0, 2) + "***")
                : "***";
        }
    }
}