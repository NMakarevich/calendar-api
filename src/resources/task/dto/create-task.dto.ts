import { IsDate, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsDate()
  date: Date;

  @IsString()
  userId: string;

  @IsString()
  @MinLength(4)
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(255)
  description: string;
}
