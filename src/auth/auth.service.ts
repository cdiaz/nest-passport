import * as jwt from 'jsonwebtoken';
import { Component, Inject, UnauthorizedException } from '@nestjs/common';

@Component()
export class AuthService {
  
  public async createToken(signedUser) {
    const expiresIn = process.env.JWT_EXPIRATION, secretOrKey = process.env.SECRET_KEY;
    const user = { sub: signedUser._id, email: signedUser.email };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    }
  }
  
}