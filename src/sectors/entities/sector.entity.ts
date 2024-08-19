import { Floor } from 'src/floors/entities/floor.entity';
import { Unit } from 'src/units/entities/unit.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity({ name: 'sectors' })
  export class Sector {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    name: string;
  
    @ManyToOne(() => Floor, (floor) => floor.sectors)
    @JoinColumn({ name: 'floor_id' })
    floor: Floor;
  
    @OneToMany(()=>Unit, (u)=>u.sector)
    units: Unit[];
  }
  