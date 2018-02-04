import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProfileController } from './profile.controller';
import { UserService } from './user.service';
import { JwtMiddleware } from '../auth/middlewares/jwt.middleware';

@Module({
  components: [UserService],
  controllers: [UserController, ProfileController],
  exports:[UserService]
})

export class UserModule  {
  public configure(consumer: MiddlewaresConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(
      { path: '/user', method: RequestMethod.GET },
      { path: '/user/:id', method: RequestMethod.ALL },
      { path: '/profile', method: RequestMethod.ALL }
    );
  }
}