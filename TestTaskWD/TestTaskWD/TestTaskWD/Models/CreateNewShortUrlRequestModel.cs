﻿// <auto-generated />
namespace TestTaskWD.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public sealed class CreateNewShortUrlRequestModel
    {
        [Required]
        public List<NewShortUrlRequestModel> FullUrls { get; set; }
    }
}