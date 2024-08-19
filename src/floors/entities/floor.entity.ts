import { Building } from 'src/buildings/entities/building.entity';
import { Sector } from 'src/sectors/entities/sector.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'floors' })
export class Floor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:'number_in_building',nullable:false})
  numberInBuilding: number;

  @ManyToOne(()=>Building,(building)=>building.floors)
  @JoinColumn({ name: 'building_id' })
  building:Building;

  @OneToMany(() => Sector, (sector) => sector.floor)
  sectors: Sector[];
}
