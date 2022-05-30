import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { OrganizationModule } from './organizations';

async function bootstrap() {
  const app = await NestFactory.create(OrganizationModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
