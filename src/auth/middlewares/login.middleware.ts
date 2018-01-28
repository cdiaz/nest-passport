import * as passport from "passport";
import { Middleware, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Middleware()
export class LogInMiddleware implements NestMiddleware {
  public resolve() {
    return async (req, res, next) => {
      return await passport.authenticate('local', {session: false}, (err, user, info) => {
        if (typeof info != 'undefined') {
          next(new UnauthorizedException(info.message))
        } else if (err) {
          next(err)
        } else {
          req.user = user
          next()
        }
      })(req, res, next)
    }
  }
}