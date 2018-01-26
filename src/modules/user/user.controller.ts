import { Controller, Post, Res, Body, Param, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}

  @Post()
  async create(@Body() user) {
    return this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return this.userService.findOne({_id: id})
  }
}