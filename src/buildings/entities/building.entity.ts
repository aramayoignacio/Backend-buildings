import { Floor } from 'src/floors/entities/floor.entity';
import { Garage } from 'src/garages/entities/garage.entity';
import { User } from 'src/users/entities/user.entity';
import { Worker } from 'src/workers/entities/worker.entity';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'buildings' })
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name:"external_id", type: 'uuid', unique: true, nullable: false })
  externalId: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Garage, (g) => g.building)
  garages: Garage[];

  @OneToMany(() => Floor, (floor) => floor.building)
  floors: Floor[];

  @ManyToMany(() => Worker, { nullable: false })
  @JoinTable({
    name: 'buildings_workers',
    joinColumn: {
      name: 'building_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'worker_id',
      referencedColumnName: 'id',
    },
  })
  workers: Worker[];

  @ManyToMany(() => User, { nullable: false })
  @JoinTable({
    name: 'users_buildings',
    joinColumn: {
      name: 'building_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @BeforeInsert()
  generateExternalId() {
    this.externalId = uuidv4();
  }
}
