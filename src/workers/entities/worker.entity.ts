import { Building } from 'src/buildings/entities/building.entity';
import { WorkerRole } from 'src/worker-roles/entities/worker-role.entity';
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
  
  @Entity({ name: 'workers' })
  export class Worker {
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
  
    @Column({ name: 'start_date', nullable: false })
    startDate: Date;
  
    @Column({ name: 'end_date', nullable: true })
    endDate: Date;
  
    @Column({ default: true })
    active: boolean;
  
    @ManyToMany(() => Building, { nullable: false })
    @JoinTable({
      name: 'buildings_workers',
      joinColumn: {
        name: 'worker_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'building_id',
        referencedColumnName: 'id',
      },
    })
    buildings: Building[];
  
    @ManyToOne(() => WorkerRole, (wr) => wr.workers)
    @JoinColumn({ name: 'role_id' })
    role: WorkerRole;
  }
  