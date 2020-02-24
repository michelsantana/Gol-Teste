using System;
using System.Collections.Generic;
using System.Text;
using Gol.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Gol.Entity.FluentMap
{
    public class PassangerMap : IEntityTypeConfiguration<Passanger>
    {
        public void Configure(EntityTypeBuilder<Passanger> builder)
        {
            builder.ToTable("Passanger");
            builder.HasKey(r => r.id);
            builder.Property(r => r.id).HasColumnName("id");
            builder.Property(r => r.nome).HasColumnName("nome");
            builder.Property(r => r.documento).HasColumnName("documento");
            builder.Property(r => r.airplaneId).HasColumnName("airplaneId");
        }
    }
}
