import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import 'dotenv/config';
import * as process from 'process';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { QueryEntity } from './entities/query.entity';

const { env } = process;

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { dateString, ...rest } = createTaskDto;
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getUTCMonth();
    const day = dateObj.getDate();
    return await this.taskRepository.save({
      ...rest,
      day,
      month,
      year,
    });
  }

  async findAll(token: string, query: QueryEntity) {
    const { userId } = this.jwtService.verify(token.split(' ')[1], {
      secret: env.JWT_SECRET,
    });
    for (const key in query) {
      query[key] = parseInt(query[key]);
    }
    return await this.taskRepository.find({
      where: {
        userId,
        ...query,
      },
    });
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task)
      throw new HttpException('Task is not found', HttpStatus.NOT_FOUND);
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    return await this.taskRepository.save({ ...task, ...updateTaskDto });
  }

  async remove(id: string) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0)
      throw new HttpException('Task is not found', HttpStatus.NOT_FOUND);
  }
}
