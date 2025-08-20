import { Injectable } from '@nestjs/common';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signup } from './entities/signup.entity'; // Assuming you have a Signup entity defined
@Injectable()
export class SignupService {
  constructor(
    @InjectModel('Signup') private readonly signupModel: Model<Signup>,
  ) { }
  async create(createSignupDto: any) {
    const existingEmail = await this.signupModel.findOne({
      email: createSignupDto.email,
    }).exec();

    if (existingEmail) {
      return {
        message: 'Email already exists',
        statusCode: 400,
      };
    }
    const existingUserphoneNumber= await this.signupModel.findOne({
      phoneNumber: createSignupDto.phoneNumber,
    }).exec();

    if (existingUserphoneNumber) {
      return {
        message: 'phoneNumber already exists',
        statusCode: 400,
      };
    }
    const newSignup = new this.signupModel(createSignupDto);
    newSignup.save();

    return {
      message: 'Signup successful',
      statusCode: 201,
    };
  }




  findAll() {
    return this.signupModel.find({}).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} signup`;
  }

  update(id: number, updateSignupDto: UpdateSignupDto) {
    return `This action updates a #${id} signup`;
  }

  remove(id: number) {
    return `This action removes a #${id} signup`;
  }
}
