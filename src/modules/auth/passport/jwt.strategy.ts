import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service'

@Component()
export class JwtStrategy extends Strategy {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: 'secret',
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