import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    minLength: 2,
    example: 'John',
  })
  @IsString()
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    minLength: 2,
    example: 'Doe',
  })
  @IsString()
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    minLength: 3,
    example: 'user',
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    minLength: 8,
    example: 'password',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
