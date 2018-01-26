import * as passport from "passport";
import { Middleware, NestMiddleware, HttpException } from '@nestjs/common';

@Middleware()
export class LogInMiddleware implements NestMiddleware {
  public resolve() {
    return async (req, res, next) => {
      return await passport.authenticate('local', {session: false}, (err, user, info) => {
        if (typeof info != 'undefined') {
          next(new HttpException(info.message, 401))
        } else if (err) {
          next(new HttpException(err, 401))
        } else {
          req.user = user
          next()
        }
      })(req, res, next)
    }
  }
}