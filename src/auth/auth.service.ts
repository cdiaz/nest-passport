import { sign } from 'jsonwebtoken';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRole, UserStatus } from '../user/enum'
import { CryptographerService } from './cryptographer.service';

@Injectable()
export class AuthService {

  constructor( 
    private readonly userService: UserService,
    private readonly cryptoService: CryptographerService
  ){}
  
  public async signUp(user: CreateUserDto) {
    user['password'] = await this.cryptoService.hashPassword(user.password);
    user['role'] = UserRole.USER
    user['status'] = UserStatus.PENDING
    return this.userService.create(user)
    .then(user => {
      // send mail
      return this.createToken(user)
    })
  }

  public async logIn(email, password) {
    return await this.userService.findOne({email: email})
    .then(async user => {
      return await this.cryptoService.checkPassword(user.password, password)
      ? Promise.resolve(user)
      : Promise.reject(new UnauthorizedException('Invalid password'))
    })
    .catch(err => Promise.reject(err))
  }
  
  public async verify(payload) {
    return await this.userService.findOne({_id: payload.sub})
    .then(signedUser => Promise.resolve(signedUser))
    .catch(err => Promise.reject(new UnauthorizedException("Invalid Authorization")))
  }

  public async createToken(signedUser) {
    const expiresIn = process.env.JWT_EXPIRATION, secretOrKey = process.env.SECRET_KEY;
    const user = { 
      sub: signedUser._id,
      email: signedUser.email,
      role: signedUser.role,
      status: signedUser.status
    };
    return {
      expires_in: expiresIn,
      access_token: await sign(user, secretOrKey, { expiresIn })
    }
  }

}