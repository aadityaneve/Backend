import { Module } from '@nestjs/common';
import { AppController, OrganizationController } from './app.controller';
import { AppService, OrganizationServices } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchema } from './organization.model.ts';

@Module({
  imports: [
    // Connection to mongodb
    MongooseModule.forRoot(
      'mongodb+srv://aadityaneve:aadityaneve12$@cluster0.aiizm.mongodb.net/nest_test',
    ),
    // Importing Organization Schema
    MongooseModule.forFeature([
      { name: 'organization', schema: OrganizationSchema },
    ]),
  ],
  controllers: [AppController, OrganizationController],
  providers: [AppService, OrganizationServices],
})
export class AppModule {}
