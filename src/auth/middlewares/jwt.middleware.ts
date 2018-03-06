import * as passport from "passport";
import { Middleware, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Middleware()
export class JwtMiddleware implements NestMiddleware {

  public resolve() {
    return async (req, res, next) => {
      return await passport.authenticate('jwt', { session: false }, (err, user, info) => {
        let message
        if(err){
          next(new UnauthorizedException(err))
        } else if (typeof info != 'undefined') {
          switch (info.message) {
            case 'No auth token':
            case 'invalid signature':
            case 'jwt malformed':
              message = "You must provide a valid authenticated access token"
              break
            case 'jwt expired':
              message = "Your session has expired. Please log in again"
              break
          }
            next(new UnauthorizedException(message))
        } else {
          req.user = user;
          next()
        }
      })(req, res, next)
   }
  }
}
