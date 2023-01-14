import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from '../../task/entities/task.entity';
import { MinLength } from 'class-validator';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @MinLength(2)
  firstName: string;

  @Column()
  @MinLength(2)
  lastName: string;

  @Column({ nullable: true })
  imageName: string;

  @OneToMany(() => Task, (task) => task.userId)
  tasks: Task[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
