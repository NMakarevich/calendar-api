import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ example: '2023-02-16' })
  @IsDateString()
  dateString: string;

  @ApiProperty({ example: 'New task title' })
  @IsString()
  @MinLength(4)
  title: string;

  @ApiProperty({ example: 'New task description' })
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  description: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isDone: boolean;
}
