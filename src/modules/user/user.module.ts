import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtMiddleware } from '../auth/middlewares/jwt.middleware';
import { UserProviders } from './user.providers';

@Module({
  components: [UserService, ...UserProviders],
  controllers: [UserController],
  exports:[UserService]
})

export class UserModule  {
  public configure(consumer: MiddlewaresConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(
      { path: '/user', method: RequestMethod.GET },
      { path: '/user/:id', method: RequestMethod.GET }
    );
  }
}