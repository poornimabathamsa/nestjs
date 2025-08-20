import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { Feature, FeatureSchema } from './entities/feature.entity';
import { Signup, SignupSchema } from 'src/signup/entities/signup.entity';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feature.name, schema: FeatureSchema },
      { name: Signup.name, schema: SignupSchema }
    ]),
  ],
  controllers: [FeaturesController],
  providers: [FeaturesService],
  exports: [FeaturesService],  // Add this line to export the service

})
export class FeaturesModule {}
