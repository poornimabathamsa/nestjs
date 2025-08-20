import { Injectable } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './entities/feature.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FeaturesService {
  private features: Feature[] = [];
  private idCounter = 1;

  constructor(
    @InjectModel(Feature.name) private readonly featureModel: Model<Feature>,
  ) {}

  async create(createFeatureDto: CreateFeatureDto): Promise<Feature> {
    const createdFeature = new this.featureModel(createFeatureDto);
    return createdFeature.save();
  }

  async updateById(id: string, updateFeatureDto: Partial<CreateFeatureDto>): Promise<Feature | null> {
    return this.featureModel.findByIdAndUpdate(id, updateFeatureDto, { new: true }).exec();
  }

  async findAll(): Promise<Feature[]> {
  return this.featureModel.find().exec();
}

async findById(id: string): Promise<Feature | null> {
  return this.featureModel.findById(id).exec();

}

async deleteById(id: string): Promise<void> {
  await this.featureModel.findByIdAndDelete(id).exec();
  
}
async bulkDelete():Promise<void>  {
  await this.featureModel.deleteMany({}).exec();
}
async getAllFeaturesWithSignupAggregation() {
  return this.featureModel.aggregate([
    {
      $lookup: {
        from: 'signups',          // collection name in MongoDB
        localField: 'userId',     // Feature.userId
        foreignField: '_id',      // Signup._id
        as: 'signupData',
      },
    },
    { $unwind: '$signupData' }, // Convert array into object
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        category: 1,
        isPremium: 1,
        'signupData.fullName': 1,
        'signupData.email': 1,
        'signupData.phoneNumber': 1,
        'signupData.address': 1,
      },
    },
  ]);
}

}