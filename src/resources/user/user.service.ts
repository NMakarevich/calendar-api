import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import 'dotenv/config';
import * as process from 'process';
import { Repository } from 'typeorm';
const { env } = process;
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const userInDb = await this.findOneByUsername(username);
    if (userInDb) throw new HttpException('User is exist', HttpStatus.CONFLICT);

    createUserDto.password = await bcrypt.hash(
      password,
      parseInt(env.BCRYPT_SALT),
    );

    const newUser = new User(createUserDto);

    return await this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    return user;
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(userId);
    if (!user)
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);

    const isMatchPassword = await bcrypt.compare(
      updateUserDto.password,
      user.password,
    );

    if (!isMatchPassword)
      throw new HttpException('Password is invalid', HttpStatus.FORBIDDEN);

    user.password = await bcrypt.hash(
      updateUserDto.newPassword,
      parseInt(env.BCRYPT_SALT),
    );
    return await this.userRepository.save(user);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
