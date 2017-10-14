import * as jwt from 'jsonwebtoken';
import { Component, Inject } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import {UserService } from '../user/user.service'
import { User } from '../user/user.interface';

@Component()
export class AuthService {
  
  constructor(
    private userservice: UserService
  ) {}

  public async createToken(signedUser) {
    const expiresIn = 60 * 60, secretOrKey = 'secret';
    const user = { sub: signedUser.id, email: signedUser.email };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    }
  }

  async validateUser(payload): Promise<User> {
    const user = await this.userservice.findById(payload.sub);
    if(!user){
      throw new HttpException('Invalid authorization', 404)
    }
    return user
  }
  
}