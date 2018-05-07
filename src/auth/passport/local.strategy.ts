import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false
    });
  }

  async validate(email, password, done: Function) {
    await this.authService.logIn(email, password)
    .then(user => done(null, user))
    .catch(err => done(err, false))
  }
}

export const callback = (err, user, info) => {
  if (typeof info != 'undefined') {
    throw new UnauthorizedException(info.message)
  } else if (err || !user) {
    throw err || new UnauthorizedException();
  }
  return user;
}