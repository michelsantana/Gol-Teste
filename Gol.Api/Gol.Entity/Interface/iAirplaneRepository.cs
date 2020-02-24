using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Gol.Domain;

namespace Gol.Entity.Interface
{
    public interface iAirplaneRepository : iGenericRepository<Airplane>
    {
        Task<List<Airplane>> GetAllAirplane();
        Task<Airplane> FindAirplane(long id);

        List<Airplane> FindAirplaneAny(string search);
    }
}
