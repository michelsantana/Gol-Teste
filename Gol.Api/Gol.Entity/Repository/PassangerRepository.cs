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
    public class PassangerRepository : GenericRepository<Passanger>, iGenericRepository<Passanger>, iPassangerRepository
    {
        public PassangerRepository(DataContext dbContext) : base(dbContext) { }

        public async Task<List<Passanger>> GetAllPassanger()
        {
            return await _dbContext.Passangers.ToListAsync();
        }

        public async Task<Passanger> FindPassanger(long id)
        {
            return await _dbContext.Passangers.Where(w => w.id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Passanger>> ListAllPassangerByAirplane(long airplaneId)
        {
            return await _dbContext.Passangers.Where(w => w.airplaneId == airplaneId).ToListAsync();
        }

        public List<Passanger> FindPassangerAny(string search)
        {
            search = search.ToUpper();
            return _dbContext.Passangers.AsEnumerable().Where(w =>
                w.id.ToString().ToUpper().Contains(search) ||
                w.nome.ToUpper().Contains(search) ||
                w.documento.ToUpper().Contains(search) ||
                w.airplaneId.ToString().ToUpper().Contains(search)
            ).ToList();
        }
    }
}
