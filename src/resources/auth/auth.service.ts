import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(pass, user.password);
    if (!isValidPassword) return null;

    const { password, ...result } = user;

    return result;
  }

  signup(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  login(user: User) {
    const payload = { username: user.username, userId: user.id };
    return {
      userId: user.id,
      token: this.jwtService.sign(payload),
    };
  }
}
