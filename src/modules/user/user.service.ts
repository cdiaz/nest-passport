import { Component, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { User } from './user.model';
import { IUser } from './user.interface';

@Component()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: typeof User
  ) {}
  
  public async findAll(): Promise<IUser[]>{
    return await User.find<User>().all();
  }

  public async findOne(params): Promise<IUser> {
    const user = await User.find<User>(params).first();
    if(user) {
      return Promise.resolve(user)
    } else {
      throw new HttpException("User not found", HttpStatus.FORBIDDEN)
    }
  }

  public create(user: User) {
    return new User(user).save()
    .then(user=>
      Promise.resolve(user)
    )
    .catch(err=>
      Promise.reject(new HttpException(err.toString(), HttpStatus.FORBIDDEN))
    )
  }

}