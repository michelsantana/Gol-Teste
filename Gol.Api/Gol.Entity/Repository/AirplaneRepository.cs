using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Gol.Domain;
using Gol.Entity.Interface;
using Microsoft.EntityFrameworkCore;

namespace Gol.Entity.Repository
{
    public class AirplaneRepository : GenericRepository<Airplane>, iGenericRepository<Airplane>, iAirplaneRepository
    {
        public AirplaneRepository(DataContext dbContext) : base(dbContext) { }

        public async Task<List<Airplane>> GetAllAirplane()
        {
            return await _dbContext.Airplanes.ToListAsync();
        }

        public async Task<Airplane> FindAirplane(long id)
        {
            return await _dbContext.Airplanes.Where(w=>w.id == id).FirstOrDefaultAsync();
        }

        public List<Airplane> FindAirplaneAny(string search)
        {
            search = search.ToUpper();
            return _dbContext.Airplanes.AsEnumerable().Where(w => 
                w.id.ToString().ToUpper().Contains(search) ||
                w.qtdPassageiros.ToString().ToUpper().Contains(search) ||
                w.modelo.ToUpper().Contains(search) ||
                w.dtCriacao.ToString().ToUpper().Contains(search)
            ).ToList();
        }
    }
}
