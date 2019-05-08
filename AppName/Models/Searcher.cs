using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class Searcher
    {
        public string sort { get; set; }
        public string order { get; set; }
        public string city { get; set; }
        public string province { get; set; }
        public string category { get; set; }
        public string search { get; set; }
        public float? minprice { get; set; }
        public float? maxprice { get; set; }
        public float? minyar { get; set; }
        public float? maxyar { get; set; }
    }
}
