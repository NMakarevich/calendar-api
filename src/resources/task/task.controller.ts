import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryEntity } from './entities/query.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { UpdatedTask } from './entities/updated-task.entity';

@ApiTags('Task')
@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBody({ type: CreateTaskDto })
  @ApiCreatedResponse({
    description: 'Task is created successfully',
    type: Task,
    schema: {
      oneOf: [
        {
          properties: {
            results: {
              type: 'object',
              items: { $ref: getSchemaPath(Task) },
            },
          },
        },
      ],
    },
  })
  @ApiForbiddenResponse({ description: 'Unauthorized' })
  @Post()
  @HttpCode(201)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @ApiOkResponse({
    description:
      'List of tasks of authorized user. May be all tasks or task for year/month/day, which entered by query params',
    type: Task,
    isArray: true,
    schema: {
      allOf: [
        {
          properties: {
            results: {
              type: 'array',
              items: { $ref: getSchemaPath(Task) },
            },
          },
        },
      ],
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  @HttpCode(200)
  findAll(@Req() req, @Query() query: QueryEntity) {
    return this.taskService.findAll(req, query);
  }

  @ApiOkResponse({
    description: 'One task by id',
    type: Task,
    schema: {
      oneOf: [
        {
          properties: {
            results: {
              type: 'object',
              items: { $ref: getSchemaPath(Task) },
            },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({ description: 'Task with entered id is not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @ApiBody({
    type: UpdateTaskDto,
  })
  @ApiOkResponse({
    description: 'Task is successfully updated',
    type: UpdatedTask,
    schema: {
      oneOf: [
        {
          properties: {
            results: {
              type: 'object',
              items: { $ref: getSchemaPath(UpdatedTask) },
            },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({ description: 'Task with entered id is not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @ApiResponse({ description: 'Task is successfully deleted', status: 204 })
  @ApiNotFoundResponse({ description: 'Task with entered id is not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
