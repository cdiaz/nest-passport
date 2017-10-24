import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { Component, Inject } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Component()
export class LocalStrategy extends Strategy {
  constructor(private readonly userService: UserService) {
    super(
      {
        usernameField: 'email',
        passReqToCallback: false
      },
      async (email, password, done) => await this.logIn(email, password, done)
    );
    passport.use(this);
  }

  public async logIn(email, password, done) {
    const user = await this.userService.findByEmail(email)
    .then(user=> {
      if (password != user.password) {
        return done('Invalid Password', false)
      } else {
        return done(null, user);
      }
    })
    .catch(err=> {
      done(err, false)
    })
  }

}