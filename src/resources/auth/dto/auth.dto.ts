import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'efdfbc10-9e7c-4787-adf3-9aa026f6d8f0',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJ1c2VySWQiOiJlZmRmYmMxMC05ZTdjLTQ3ODctYWRmMy05YWEwMjZmNmQ4ZjAiLCJpYXQiOjE2NzM3MTc0ODQsImV4cCI6MTY3MzcyMTA4NH0.AmXVXA5YOKr4xTkoXP0d3ME-LJGH9ADmfAxkC0JIzgw',
  })
  @IsString()
  token: string;
}
