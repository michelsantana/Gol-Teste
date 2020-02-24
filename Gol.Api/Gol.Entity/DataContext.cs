using System;
using System.Collections.Generic;
using System.Text;
using Gol.Domain;
using Gol.Entity.FluentMap;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Gol.Entity
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Airplane> Airplanes { get; set; }
        public DbSet<Passanger> Passangers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AirplaneMap());
            modelBuilder.ApplyConfiguration(new PassangerMap());
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
               .Build();
            optionsBuilder.UseSqlite(Startup.ConnectionString);
            //optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            //.UseLazyLoadingProxies();

        }
    }
}
