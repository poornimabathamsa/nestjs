import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeaturesModule } from './features/features.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignupModule } from './signup/signup.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestProject'),
    FeaturesModule,
    SignupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
