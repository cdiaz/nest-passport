import * as passport from "passport";
import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { NextFunction } from 'express'
import { HttpException } from '@nestjs/core'

@Middleware()
export class JwtMiddleware implements NestMiddleware {

  public resolve() {
    let message
    return async (req, res, next) => {
      return await passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if(err){
            next(new HttpException(err, 401))
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
            next(new HttpException(message, 401))
        } else {
          next()
        }
      })(req, res, next)
   }
  }
}


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