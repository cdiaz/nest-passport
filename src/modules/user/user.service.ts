import { Component, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto'

@Component()
export class UserService {

  public async create(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 10);
    return new User(user).save()
    .then(user=>Promise.resolve(user))
    .catch(err=>
      Promise.reject(new BadRequestException(err.toString()))
    )
  }
  
  public async findAll(): Promise<IUser[]>{
    return await User.find<User>().all();
  }

  public async findOne(params): Promise<IUser> {
    return await User.find<User>(params).first()
    .then(user=>{
      return (user) 
      ? Promise.resolve(user) 
      : Promise.reject(new NotFoundException('User not exist'))
    })
    .catch(err=> Promise.reject(err))
  }

}