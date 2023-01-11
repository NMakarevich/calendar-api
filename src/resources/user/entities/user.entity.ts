import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
