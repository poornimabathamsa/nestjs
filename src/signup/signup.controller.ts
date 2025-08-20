import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Signup } from './entities/signup.entity'; // Assuming you have a Signup entity defined
import { CreateFeatureDto } from 'src/features/dto/create-feature.dto';
import { FeaturesService } from 'src/features/features.service';
@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService,private readonly featureService: FeaturesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Signup created', type: Signup })
  async create(
    @Body() createSignupDto: CreateSignupDto,
  ): Promise<Signup | { message: string; statusCode: number; data?: any }> {
    const userInsert = await this.signupService.create(createSignupDto);
    // Type guard to check if data exists
    if (userInsert.data) {
      console.log('Created user ID:', userInsert.data.id);
      const featureData = {
        name: 'User Feature', // Provide a default name or get it from the DTO
        description: 'Default feature for user',
        ...createSignupDto,
        userId: userInsert.data.id, // Add the user ID to the feature data
      };
      await this.featureService.create(featureData);
    }
  
    return userInsert;
  }


  @Get()
  findAll() {
    return this.signupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignupDto: UpdateSignupDto) {
    return this.signupService.update(+id, updateSignupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signupService.remove(+id);
  }
}
