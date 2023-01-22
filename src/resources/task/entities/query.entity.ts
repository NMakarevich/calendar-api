import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryEntity {
  @ApiProperty({ example: 2023, required: false })
  @Transform(({ value }) => parseInt(value))
  year: number;

  @ApiProperty({ example: 1, required: false })
  @Transform(({ value }) => parseInt(value))
  month: number;

  @ApiProperty({ example: 16, required: false })
  @Transform(({ value }) => parseInt(value))
  day: number;
}
