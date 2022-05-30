import { NestFactory } from '@nestjs/core';
import { OrganizationModule } from './organizations';

async function bootstrap() {
  const app = await NestFactory.create(OrganizationModule);
  await app.listen(3000);
}
bootstrap();
