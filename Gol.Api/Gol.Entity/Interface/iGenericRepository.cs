using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Gol.Entity.Interface
{
    public interface iGenericRepository<T> where T : class
    {
        Task Add(T entity);
        void Update(T entity);
        void Remove(T entity);
        Task<bool> SaveChanges();
    }
}
