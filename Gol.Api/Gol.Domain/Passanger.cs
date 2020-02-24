using System;
using System.Collections.Generic;
using System.Text;

namespace Gol.Domain
{
    public class Passanger
    {
        public long id { get; set; }
        public string nome { get; set; }
        public string documento { get; set; }
        public long airplaneId { get; set; }
    }
}
