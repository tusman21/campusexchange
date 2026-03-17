import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from '@shared/models';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this._authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this._authService.signUp(createUserDto);
  }

  @Get('whoami')
  whoAmI(@Request() req) {
    return req.user;
  }
}
