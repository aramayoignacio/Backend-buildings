import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { responseOk } from 'utils';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,    private jwtService: JwtService

  ) { }

  async signIn({ username, password }: LoginDto): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id, isAdmin: user.isAdmin };
    const token = this.jwtService.sign(payload);
    return responseOk({ token, username: user.username, isAdmin: user.isAdmin });
  }
}