import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationModule } from './organizations';
import { PatientModule } from './patient';
import keys from './configs/keys';
@Module({
  imports: [
    MongooseModule.forRoot(keys.mongoURI, { useNewUrlParser: true }),
    OrganizationModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
