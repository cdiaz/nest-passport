import { Component, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { User } from './user.model';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Component()
export class UserService {

  public async create(user: CreateUserDto) {
    return new User(user).save()
    .then(user => Promise.resolve(user))
    .catch(err =>
      Promise.reject(new BadRequestException(err.toString()))
    )
  }
  
  public async findAll(): Promise<IUser[]> {
    return await User.find<User>().all();
  }

  public async findOne(params): Promise<any> {
    return await User.find<User>(params).first()
    .then(user => {
      return (user) 
      ? Promise.resolve(user) 
      : Promise.reject(new NotFoundException('User not exist'))
    })
    .catch(err => Promise.reject(err))
  }

  public async update(id: string, payload: CreateUserDto) {
    return await this.findOne({_id: id })
    .then(
      async user => {
        user.name = payload.name;
        user.email = payload.email;
        //put this in a pre-save hook if you use Mongoose or BeforeInsert if use TypeOrm
        user.password = (await compare(payload.password, user.password))
        ? user.password
        : await hash(payload.password, 10)
        //
        return user.save()
        .then(() =>
          Promise.resolve({ message: 'user has been updated'})
        )
        .catch(
          err => Promise.reject(new NotFoundException(err))
        )
      }
    )
  }

  public async delete(params): Promise<any> {
    return await this.findOne(params)
    .then(
      user => user.remove()
      .then(() => Promise.resolve({message: 'user has been deleted'})
      )
    )
  }
}