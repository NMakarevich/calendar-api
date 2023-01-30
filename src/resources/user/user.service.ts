import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { rm, rename } from 'fs/promises';
import * as path from 'path';

import 'dotenv/config';
import * as process from 'process';
import { Repository } from 'typeorm';
import { NotFoundException } from '../../utils/functions';
import { join } from 'path';
import { createReadStream, access } from 'fs';
import * as constants from 'constants';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

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
    if (!user) NotFoundException('User', id);
    return user;
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async updateProfile(id: string, updateUserProfileDto: UpdateUserProfileDto) {
    const user = await this.findOne(id);

    const updatedUser = Object.assign(user, updateUserProfileDto);
    return await this.userRepository.save(updatedUser);
  }

  async updatePassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const user = await this.findOne(id);

    const isMatchPassword = await bcrypt.compare(
      updateUserPasswordDto.password,
      user.password,
    );

    if (!isMatchPassword)
      throw new HttpException('Password is invalid', HttpStatus.FORBIDDEN);

    user.password = await bcrypt.hash(
      updateUserPasswordDto.newPassword,
      parseInt(env.BCRYPT_SALT),
    );
    return await this.userRepository.save(user);
  }

  getPhoto(filename: string) {
    const path = join(process.cwd(), 'uploads', filename);
    access(path, constants.F_OK, (err) => {
      if (err)
        throw new HttpException(
          `File ${filename} is not found`,
          HttpStatus.NOT_FOUND,
        );
    });
    return createReadStream(path);
  }

  async uploadPhoto(id: string, file: Express.Multer.File) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user.imageName) {
      await rm(path.join(process.cwd(), 'uploads', user.imageName), {
        recursive: true,
      });
    }

    const { filename } = file;

    user.imageName = `${file.filename}.${file.mimetype.split('/')[1]}`;
    await rename(
      path.join(process.cwd(), 'uploads', filename),
      path.join(process.cwd(), 'uploads', user.imageName),
    );

    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (user.imageName) {
      await rm(path.join(process.cwd(), 'uploads', user.imageName), {
        recursive: true,
      });
    }

    const result = await this.userRepository.delete(id);
    if (result.affected === 0) NotFoundException('User', id);
  }
}
