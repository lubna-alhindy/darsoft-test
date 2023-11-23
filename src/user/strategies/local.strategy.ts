import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { isEmail, length } from 'class-validator';
import { Strategy } from 'passport-local';

import { UserService } from '../user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private service: UserService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  async validate(email: string, password: string) {
    if (!isEmail(email)) {
      throw new BadRequestException('This email is incorrect');
    }
    if (!length(password, 8, 32)) {
      throw new BadRequestException('The password is incorrect');
    }

    const user = await this.service.validateUserCredentials(email, password);
    if (!user) {
      throw new BadRequestException('The email or password is incorrect');
    }

    return user;
  }
}
