import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('task')
export class Task {
  @ApiProperty({ example: '375566f3-eff6-4d54-b9d8-a45365fc7a2f' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'efdfbc10-9e7c-4787-adf3-9aa026f6d8f0' })
  @Column()
  userId: string;

  @ApiProperty({ example: 2023 })
  @Column()
  year: number;

  @ApiProperty({ example: 1 })
  @Column()
  month: number;

  @ApiProperty({ example: 16 })
  @Column()
  day: number;

  @ApiProperty({ example: 'Task title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Task description' })
  @Column()
  description: string;

  @ApiProperty({ example: false })
  @Column({ default: false })
  isDone: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
