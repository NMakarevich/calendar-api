import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserPasswordDto extends PartialType(CreateUserDto) {
  @IsString()
  password: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}
