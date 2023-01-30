import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import 'dotenv/config';
import * as process from 'process';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { QueryEntity } from './entities/query.entity';
import { checkDate, NotFoundException } from '../../utils/functions';

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
    checkDate(dateString);

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

  async findAll(req: Request, query: QueryEntity) {
    const { headers } = req;
    const token = headers['authorization'];
    const { userId } = this.jwtService.verify(token.split(' ')[1], {
      secret: env.JWT_SECRET,
    });

    const tasks = await this.taskRepository.find({
      where: {
        userId,
        ...query,
      },
    });

    return tasks.sort(
      (a, b) =>
        new Date(a.year, a.month, a.day).getTime() -
        new Date(b.year, b.month, b.day).getTime(),
    );
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) NotFoundException('Task', id);
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const { dateString } = updateTaskDto;
    checkDate(dateString);

    const task = await this.findOne(id);
    const updatedTask = Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(updatedTask);
  }

  async remove(id: string) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) NotFoundException('Task', id);
  }
}
