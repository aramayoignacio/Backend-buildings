import { Unit } from 'src/units/entities/unit.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'unit_types' })
export class UnitType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @OneToMany(() => Unit, (u) => u.type)
  units: Unit[];
}
