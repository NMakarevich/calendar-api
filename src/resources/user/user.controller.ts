import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  ParseUUIDPipe,
  UploadedFile,
  Header,
  StreamableFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User has been successfully created',
    type: User,
    schema: {
      oneOf: [
        {
          properties: {
            results: {
              type: 'object',
              items: { $ref: getSchemaPath(User) },
            },
          },
        },
      ],
    },
  })
  @ApiConflictResponse({
    description: 'User with entered login is exist',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiExcludeEndpoint()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiBearerAuth()
  @ApiProperty({ title: 'id', type: 'string' })
  @ApiOkResponse({
    description: 'User with entered id',
    type: User,
    schema: {
      oneOf: [
        {
          properties: {
            results: {
              type: 'object',
              items: { $ref: getSchemaPath(User) },
            },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'User with id is not found',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserPasswordDto })
  @ApiOkResponse({
    description: 'Password successfully updated',
    type: User,
    schema: {
      oneOf: [
        {
          properties: {
            results: {
              type: 'object',
              items: { $ref: getSchemaPath(User) },
            },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'User with id is not found',
  })
  @ApiForbiddenResponse({ description: 'Incorrect password' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id/password')
  @HttpCode(200)
  updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.userService.updatePassword(id, updateUserPasswordDto);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'photo' })
  @ApiOkResponse({
    description: 'Photo successfully uploaded',
    type: User,
    schema: {
      oneOf: [
        {
          properties: {
            results: {
              type: 'object',
              items: { $ref: getSchemaPath(User) },
            },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'User with id is not found',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileInterceptor('file', {
      dest: './uploads',
      fileFilter(
        req: any,
        file: Express.Multer.File,
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) {
        if (file.mimetype.includes('image/')) callback(null, true);
        else {
          return callback(
            new HttpException(
              'File must be an image',
              HttpStatus.UNPROCESSABLE_ENTITY,
            ),
            false,
          );
        }
      },
      limits: { fileSize: 100000 },
    }),
  )
  @Patch(':id/photo')
  @HttpCode(200)
  uploadPhoto(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.userService.uploadPhoto(id, file);
  }

  @ApiExcludeEndpoint()
  @Public()
  @Get('photo/:filename')
  @HttpCode(200)
  @Header('Content-Type', 'image/*')
  getPhoto(@Param('filename') filename: string) {
    const file = this.userService.getPhoto(filename);
    return new StreamableFile(file);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  @ApiNotFoundResponse({ description: 'User is not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.remove(id);
  }
}
