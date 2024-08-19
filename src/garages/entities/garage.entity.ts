import { Building } from 'src/buildings/entities/building.entity';
import { Unit } from 'src/units/entities/unit.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'garages' })
export class Garage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  covered:boolean;

  @Column()
  fixed:boolean;

  @Column()
  storage:boolean;

  @Column({name:'number_in_building',nullable:false})
  numberInBuilding: number;

  @ManyToOne(()=>Building,(building)=>building.garages)
  @JoinColumn({ name: 'building_id' })
  building:Building;
  
  @ManyToOne(()=>Unit,(u)=>u.garages)
  @JoinColumn({ name: 'unit_id' })
  unit:Unit;

  
}
