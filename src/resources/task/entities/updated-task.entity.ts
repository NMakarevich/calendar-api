import { ApiProperty } from '@nestjs/swagger';

export class UpdatedTask {
  @ApiProperty({ example: '375566f3-eff6-4d54-b9d8-a45365fc7a2f' })
  id: string;

  @ApiProperty({ example: 'efdfbc10-9e7c-4787-adf3-9aa026f6d8f0' })
  userId: string;

  @ApiProperty({ example: 2023 })
  year: number;

  @ApiProperty({ example: 2 })
  month: number;

  @ApiProperty({ example: 16 })
  day: number;

  @ApiProperty({ example: 'New task title' })
  title: string;

  @ApiProperty({ example: 'New task description' })
  description: string;

  @ApiProperty({ example: true })
  isDone: boolean;
}
