﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class FileUploadModel
    {
        public IFormFile File { get; set; }
        public string Source { get; set; }
        public string Extension { get; set; }
    }
}
