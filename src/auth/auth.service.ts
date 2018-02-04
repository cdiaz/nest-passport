import * as jwt from 'jsonwebtoken';
import { Component, Inject, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRole, UserStatus } from '../user/enum'

@Component()
export class AuthService {

  constructor( 
    private readonly userService: UserService
  ){}
  
  public async signUp(user: CreateUserDto) {
    user['role'] = UserRole.USER
    user['status'] = UserStatus.PENDING
    return this.userService.create(user)
    .then(user => {
        // send mail
        return this.createToken(user)
      }
    )
  }

  public async createToken(signedUser) {
    const expiresIn = process.env.JWT_EXPIRATION, secretOrKey = process.env.SECRET_KEY;
    const user = { 
      sub: signedUser._id, 
      email: signedUser.email,
      role: signedUser.role,
      status: signedUser.status
    };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token
    }
  }

}