import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: '2023-01-16' })
  @IsDateString()
  dateString: string;

  @ApiProperty({ example: 'efdfbc10-9e7c-4787-adf3-9aa026f6d8f0' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'Task title' })
  @IsString()
  @MinLength(4)
  title: string;

  @ApiProperty({ example: 'Task description' })
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  description: string;
}
