import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProfileController } from './profile.controller';
import { UserService } from './user.service';
import { CryptographerService } from '../auth/cryptographer.service';

@Module({
  controllers: [UserController, ProfileController],
  providers: [UserService, CryptographerService],
  exports:[UserService]
})

export class UserModule { }