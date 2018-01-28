import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Component()
export class JwtStrategy extends Strategy {
  constructor(
    private readonly userService: UserService
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: process.env.SECRET_KEY,
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    )
    passport.use(this)
  }

  public async verify(req, payload, done) {
    return await this.userService.findOne({_id: payload.sub})
    .then(signedUser=> done(null, signedUser))
    .catch(err=> done('Invalid authorization', false)
    )
  }
}