import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProfileController } from './profile.controller';
import { UserService } from './user.service';
import { JwtMiddleware } from '../auth/middlewares/jwt.middleware';
import { CryptographerService } from '../auth/cryptographer.service';

@Module({
  controllers: [UserController, ProfileController],
  providers: [UserService, CryptographerService],
  exports:[UserService]
})

export class UserModule  {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/user');
  }
}