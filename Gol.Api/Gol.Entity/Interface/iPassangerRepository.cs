using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Gol.Domain;

namespace Gol.Entity.Interface
{
    public interface iPassangerRepository : iGenericRepository<Passanger>
    {
        Task<List<Passanger>> GetAllPassanger();
        Task<Passanger> FindPassanger(long id);
        Task<List<Passanger>> ListAllPassangerByAirplane(long airplaneId);
        List<Passanger> FindPassangerAny(string search);
    }
}
