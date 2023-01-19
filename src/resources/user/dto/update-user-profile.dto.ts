import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserProfileDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'Alex',
  })
  @IsString()
  @MinLength(2)
  @IsOptional()
  firstName: string;

  @ApiProperty({
    example: 'Smith',
  })
  @MinLength(2)
  @IsOptional()
  lastName: string;
}
