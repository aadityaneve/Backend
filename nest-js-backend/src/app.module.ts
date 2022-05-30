import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationModule } from './organizations';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://aadityaneve:aadityaneve12$@cluster0.aiizm.mongodb.net/nest_test',
      { useNewUrlParser: true },
    ),
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
