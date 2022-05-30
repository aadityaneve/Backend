import { Module, ValidationError } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';
import {
  AppController,
  OrganizationController,
} from './organization.controller';
import { AppService, OrganizationServices } from './organization.service';

import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchema } from './organization.model';

// export interface ValidationPipeOptions extends ValidatorOptions {
//   transform?: boolean;
//   disableErrorMessages?: boolean;
//   exceptionFactory?: (errors: ValidationError[]) => any;
// }

@Module({
  imports: [
    // Connection to mongodb
    // MongooseModule.forRoot(
    //   'mongodb+srv://aadityaneve:aadityaneve12$@cluster0.aiizm.mongodb.net/nest_test',
    // ),
    // Importing Organization Schema
    MongooseModule.forFeature([
      { name: 'organization', schema: OrganizationSchema },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationServices],
  exports: [OrganizationServices],
})
export class OrganizationModule {}
