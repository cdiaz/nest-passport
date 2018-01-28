import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use (bodyParser.urlencoded ({ extended: false })) 
  app.use(bodyParser.json());

  const port = parseInt(process.env.PORT, 10);
  await app.listen(port);
}
bootstrap();
