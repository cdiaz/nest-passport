import { Controller, Post, Req, Body, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signUp(@Body(new ValidationPipe()) user: CreateUserDto) {
    return await this.authService.signUp(user);
  }
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req) {
    return await this.authService.createToken(req.user);
  }

}