﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class MessageModel
    {
        public int Id { get; set; }
        public string UserFrom { get; set; }
        public string UserTo { get; set; }
        public string Topic { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
    }
}