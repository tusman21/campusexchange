import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@shared/models';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== pass) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  signUp(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
