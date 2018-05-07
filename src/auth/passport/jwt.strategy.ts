import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload, done: Function) {
    return await this.authService.verify(payload)
    .then(signedUser =>  done(null, signedUser))
    .catch( err => done(err, false))
  }
}

export const callback = (err, user, info) => {
  let message
  if (err) {
    return (err || new UnauthorizedException(info.message));
  } else if (typeof info != 'undefined' || !user) {
    switch (info.message) {
      case 'No auth token':
      case 'invalid signature':
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        message = "You must provide a valid authenticated access token"
        break
      case 'jwt expired':
        message = "Your session has expired"
        break
      default:
        message = info.message;
        break
    }
    throw new UnauthorizedException(message);
  }
  return user;
}