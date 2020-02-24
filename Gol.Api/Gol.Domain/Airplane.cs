using System;

namespace Gol.Domain
{
    public class Airplane
    {
        public long id { get; set; }
        public string modelo { get; set; }
        public long qtdPassageiros { get; set; }
        public DateTime? dtCriacao { get; set; }
    }
}
