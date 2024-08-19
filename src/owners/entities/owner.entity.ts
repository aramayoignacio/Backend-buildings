import { Unit } from 'src/units/entities/unit.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    Long,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity({ name: 'owners' })
  export class Owner {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'first_name', nullable: false })
    firstName: string;
  
    @Column({ name: 'last_name', nullable: false })
    lastName: string;
  
    @Column({ nullable: false })
    address: string;
  
    @Column({ nullable: false })
    dni: number;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false })
    email: string;
  
    @Column({ default: true })
    active: boolean;
  
    @ManyToMany(() => Unit, { nullable: false })
    @JoinTable({
      name: 'units_owners',
      joinColumn: {
        name: 'owner_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'unit_id',
        referencedColumnName: 'id',
      },
    })
    units: Unit[];
  
    @Column({name:"has_keys"})
    hasKey:boolean;
  }
  