import * as passport from 'passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { Component, Inject, UnauthorizedException } from '@nestjs/common';
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
    await this.userService.findOne({email: email})
    .then(async user=> {
      await bcrypt.compare(password, user.password)
      .then(isValid=> {
        return (isValid) 
        ? done(null, user) 
        : Promise.reject('Invalid password')
      })
      .catch(err=> Promise.reject(new UnauthorizedException(err.toString())))
    })
    .catch(err=> {
      done(err, false)
    })
  }

}