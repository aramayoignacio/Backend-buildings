import { Building } from 'src/buildings/entities/building.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
}
