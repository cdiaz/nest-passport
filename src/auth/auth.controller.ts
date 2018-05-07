import { Controller, Post, Req, Body, HttpStatus, HttpCode, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { callback } from './passport/local.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signUp(@Body(new ValidationPipe()) user: CreateUserDto) {
    return await this.authService.signUp(user);
  }
  
  @Post('login')
  @UseGuards(AuthGuard('local', {session: false, callback}))
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req) {
    return await this.authService.createToken(req.user);
  }

}