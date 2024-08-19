import { Garage } from 'src/garages/entities/garage.entity';
import { Owner } from 'src/owners/entities/owner.entity';
import { Sector } from 'src/sectors/entities/sector.entity';
import { Tenant } from 'src/tenants/entities/tenant.entity';
import { UnitType } from 'src/unit-types/entities/unit-type.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'units' })
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => Sector, (s) => s.units)
  @JoinColumn({ name: 'sector_id' })
  sector: Sector;

  @Column()
  keys: boolean;

  @OneToMany(() => Garage, (g) => g.unit)
  garages: Garage[];

  @ManyToOne(() => UnitType, (ut) => ut.units)
  @JoinColumn({ name: 'unit_type_id' })
  type: UnitType;

  @ManyToMany(() => Owner, { nullable: false })
  @JoinTable({
    name: 'units_owners',
    joinColumn: {
      name: 'unit_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'owner_id',
      referencedColumnName: 'id',
    },
  })
  owners: Owner[];

  @ManyToMany(() => Tenant, { nullable: false })
  @JoinTable({
    name: 'units_tenants',
    joinColumn: {
      name: 'unit_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tenant_id',
      referencedColumnName: 'id',
    },
  })
  tenants: Tenant[];
}
