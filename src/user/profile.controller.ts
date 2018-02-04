import { Controller, Get, Put, Req, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

import { ValidationPipe } from '../common/pipes/validation.pipe';
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly userService: UserService
  ){}
  
  @Get()
  async me(@Req() req): Promise<IUser[]> {
    return await this.userService.findOne({_id: req.user._id});
  }

  @Put()
  async update(@Req() req, @Body(new ValidationPipe()) payload:CreateUserDto) {
    return this.userService.update(req.user._id, payload)
  }

}