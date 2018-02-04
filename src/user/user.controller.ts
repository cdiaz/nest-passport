import { Controller, Get, Post, Put, Delete, Req, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}

  @Get()
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id): Promise<IUser> {
    return this.userService.findOne({_id: id})
  }

  @Put('/:id')
  async update(@Param('id') id, @Body(new ValidationPipe()) payload:CreateUserDto) {
    return this.userService.update(id, payload)
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    return this.userService.delete({_id: id})
  }
}