import { Injectable } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './entities/feature.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Signup} from '../signup/entities/signup.entity'; // Assuming you have a Signup entity defined
@Injectable()
export class FeaturesService {


  constructor(
    @InjectModel(Feature.name) private readonly featureModel: Model<Feature>,
    @InjectModel(Signup.name) private readonly signupModel: Model<Signup>, // Assuming you have a Signup model defined
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
async getSignupWithFeatures() {
  return this.signupModel.aggregate([
    {
      $lookup: {
        from: 'features',      // The "features" collection
        localField: '_id',     // signups._id
        foreignField: 'userId',// features.userId
        as: 'featuresData',
      },
    },
    {
      $unwind: '$featuresData', // ✅ Converts array to object → behaves like INNER JOIN
    },
    {
      $project: {
        _id: 1,
        fullName: 1,
        email: 1,
        phoneNumber: 1,
        address: 1,
        name: '$featuresData.name',
        description: '$featuresData.description',
        category: '$featuresData.category',
        isPremium: '$featuresData.isPremium',
        
      },
    },
  ]);
}

}