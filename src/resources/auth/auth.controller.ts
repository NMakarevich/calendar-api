import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './guards/jwt-auth.guard';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { AuthDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignupDto })
  @ApiCreatedResponse({
    description: 'User has been successfully registered',
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
  @ApiConflictResponse({ description: 'User with entered username is exist' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @Post('/signup')
  @HttpCode(201)
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'User successfully login',
    type: AuthDto,
    schema: {
      oneOf: [
        {
          properties: {
            results: {
              type: 'object',
              items: { $ref: getSchemaPath(AuthDto) },
            },
          },
        },
      ],
    },
  })
  @ApiForbiddenResponse({ description: 'Incorrect username or/and password' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
