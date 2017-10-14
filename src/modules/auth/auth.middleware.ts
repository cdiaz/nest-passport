import * as passport from "passport";
import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/core'
@Middleware()
export class JwtMiddleware implements NestMiddleware {
    public resolve(): (req, res, next) => void {
      return (passport.authenticate('jwt', { session: false }, (err, user, info, next) => {
        if(err){
          throw new HttpException(info.message, 401)
        }else{
          next()
        }
      }))
   }
}

@Middleware()
export class LogInMiddleware implements NestMiddleware {
    public resolve(): (req, res, next) => void {
        return passport.authenticate('local', { session: false });
    }
}