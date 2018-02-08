import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MailerModule.forRoot(),
    AuthModule, 
    UserModule,
    DatabaseModule
  ],
})
export class ApplicationModule {}