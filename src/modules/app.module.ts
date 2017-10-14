import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  modules: [
    AuthModule, 
    UserModule
  ],
})
export class ApplicationModule {}