import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtMiddleware } from '../auth/auth.middleware';

@Module({
  components: [ UserService ],
  controllers: [ UserController ],
  exports:[ UserService ]
})

export class UserModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(UserController);
  }
}