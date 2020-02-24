using System;
using System.Collections.Generic;
using System.Text;
using Gol.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gol.Entity.FluentMap
{
    public class AirplaneMap : IEntityTypeConfiguration<Airplane>
    {
        public void Configure(EntityTypeBuilder<Airplane> builder)
        {
            builder.ToTable("Airplane");
            builder.HasKey(r => r.id);
            builder.Property(r => r.id).HasColumnName("id");
            builder.Property(r => r.modelo).HasColumnName("modelo");
            builder.Property(r => r.qtdPassageiros).HasColumnName("qtdPassageiros");
            builder.Property(r => r.dtCriacao).HasColumnName("dtCriacao");
        }
    }
}
