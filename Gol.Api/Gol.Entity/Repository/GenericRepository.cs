using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Gol.Entity.Interface;
using Microsoft.EntityFrameworkCore;

namespace Gol.Entity.Repository
{
    public class GenericRepository<T> : iGenericRepository<T> where T : class
    {
        public readonly DataContext _dbContext;
        public GenericRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
            _dbContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public async Task Add(T entity)
        {
            await _dbContext.AddAsync(entity);
        }

        public void Update(T entity)
        {
            _dbContext.Update(entity);
        }

        public void Remove(T entity)
        {
            _dbContext.Remove(entity);
        }

        public async Task<bool> SaveChanges()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}
