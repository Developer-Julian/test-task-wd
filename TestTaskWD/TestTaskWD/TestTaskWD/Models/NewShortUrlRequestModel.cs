﻿// <auto-generated />
namespace TestTaskWD.Models
{
    using System.ComponentModel.DataAnnotations;

    public sealed class NewShortUrlRequestModel
    {
        [Required]
        [Url]
        public string Url { get; set; }
    }
}