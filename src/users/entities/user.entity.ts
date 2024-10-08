import { Building } from 'src/buildings/entities/building.entity';
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ name:"external_id", type: 'uuid', unique: true, nullable: false })
  externalId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: "is_admin", default: false })
  isAdmin: boolean;

  @ManyToMany(() => Building, { nullable: false })
  @JoinTable({
    name: 'users_buildings',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'building_id',
      referencedColumnName: 'id',
    },
  })
  buildings: Building[];

  @BeforeInsert()
  generateExternalId() {
    this.externalId = uuidv4();
  }
}
