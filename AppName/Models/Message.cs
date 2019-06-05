using System;

namespace AppName.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string UserFrom { get; set; }
        public string UserTo { get; set; }
        public string Topic { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
    }
}
