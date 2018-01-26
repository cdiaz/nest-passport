import { Module, Global } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Global()
@Module({
  components: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
