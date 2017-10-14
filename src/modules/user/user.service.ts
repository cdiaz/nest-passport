import * as jwt from 'jsonwebtoken';
import { Component, Inject } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { User } from './user.interface';

@Component()
export class UserService {
  private readonly users: User[] = [
    {id:12, name:'John Doe', email:'johndoe@nestjs.com', password:'12345'},
    {id:2, name:'Alice Caeiro', email:'alice@nestjs.com', password:'12345'},
    {id:3, name:'Who Knows', email:'whoknows@nestjs.com', password:'12345'}
  ];
  
  public findAll(): User[] {
    return this.users;
  }

  public findById(id: number): Promise<User> {
    const user = this.users.find((user)=> user.id === +id);
    if(Object.keys(user).length = 0) {
      throw new HttpException('User not found', 404)
    }
    return Promise.resolve(user);
  }

  public findByEmail(email: string): Promise<User> {
    const user = this.users.find((user)=> user.email === email);
    if(!user) {
      return Promise.reject('User not found')
    }
    return Promise.resolve(user);
  }

  public create(user: User) {
    this.users.push(user);
    return
  }

}