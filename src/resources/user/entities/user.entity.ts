import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from '../../task/entities/task.entity';
import { MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @ApiProperty({ example: 'efdfbc10-9e7c-4787-adf3-9aa026f6d8f0' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user' })
  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    example: 'John',
  })
  @Column()
  @MinLength(2)
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Column()
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    example: 'd5c840cc20bd213aef3f8226a1750b6e.jpeg',
  })
  @Column({ nullable: true })
  imageName: string;

  @OneToMany(() => Task, (task) => task.userId)
  tasks: Task[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
