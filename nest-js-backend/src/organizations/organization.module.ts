import { Module } from '@nestjs/common';
import {
  AppController,
  OrganizationController,
} from './organization.controller';
import { AppService, OrganizationServices } from './organization.service';

import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchema } from './organization.model';

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
export class OrganizationModule {}
