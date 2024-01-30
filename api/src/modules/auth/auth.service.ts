import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/users.entity';
import { pick } from 'lodash';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  createToken(user: Users): string {
    const jwtPayload = pick(user, ['email', 'username', 'id']);
    return this.jwtService.sign(jwtPayload);
  }
}
