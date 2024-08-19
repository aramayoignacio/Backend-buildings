import { Worker } from 'src/workers/entities/worker.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    Long,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity({ name: 'worker_roles' })
  export class WorkerRole {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'name', nullable: false })
    name: string;
  
   
    @OneToMany(() => Worker, (worker)=>worker.role)
    workers: Worker[];
  }
  