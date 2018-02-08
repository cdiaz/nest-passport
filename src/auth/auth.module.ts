import * as passport from 'passport';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { LogInMiddleware } from '../auth/middlewares/login.middleware';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { CryptographerService } from './cryptographer.service';

@Module({
  components: [AuthService, JwtStrategy, LocalStrategy, CryptographerService],
  controllers: [AuthController],
  imports: [UserModule]
})

export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer.apply(LogInMiddleware).forRoutes(
      { path: '/auth/login', method: RequestMethod.ALL }
    )
  }
}