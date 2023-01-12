import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsDateString()
  dateString: string;

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
