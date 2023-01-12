import { Transform } from 'class-transformer';

export class QueryEntity {
  @Transform(({ value }) => parseInt(value))
  year: number;

  @Transform(({ value }) => parseInt(value))
  month: number;

  @Transform(({ value }) => parseInt(value))
  day: number;
}
