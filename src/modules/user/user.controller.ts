import { Controller, Post, Res, Body, Param, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}

  @Post()
  async create(@Body() user) {
    this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return this.userService.findById(id)
  }
}