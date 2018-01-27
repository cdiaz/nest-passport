import * as jwt from 'jsonwebtoken';
import { Component, Inject, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { IUser } from '../user/user.interface';

@Component()
export class AuthService {
  
  constructor(
    private userservice: UserService
  ) {}

  public async createToken(signedUser) {
    const expiresIn = 60 * 60, secretOrKey = 'secret';
    const user = { sub: signedUser._id, email: signedUser.email };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    }
  }

  async validateUser(payload): Promise<IUser> {
    return await this.userservice.findOne({_id: payload.sub})
  }
  
}