import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
// import { Feature, FeatureSchema } from './feature.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Feature ,FeatureSchema} from './entities/feature.entity';



@Module({
   imports: [
    MongooseModule.forFeature([{ name: Feature.name, schema: FeatureSchema }]),
  ],
  controllers: [FeaturesController],
  providers: [FeaturesService],
})
export class FeaturesModule {}
