import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import keys from 'src/config/keys';
import { PatientModule } from './patient/patient.module';
@Module({
  imports: [PatientModule, MongooseModule.forRoot(keys.mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
