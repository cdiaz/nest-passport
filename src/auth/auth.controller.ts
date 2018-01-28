import { Controller, Post, Req, Body, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req) {
    return await this.authService.createToken(req.user);
  }

}