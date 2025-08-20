import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { SetMetadata } from '@nestjs/common';
import { Feature } from './entities/feature.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('features')
@Controller('features')
export class FeaturesController {
  featureModel: any;
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  async getAllFeatures() {
    return this.featuresService.getSignupWithFeatures();
  }

  //bulk delete features by IDs
  @Delete('bulk')
  @ApiOperation({ summary: 'Bulk delete features by IDs' })
  @ApiResponse({ status: 200, description: 'Features deleted' })
  async bulkDelete(): Promise<Promise<void>> {
    return this.featuresService.bulkDelete();
  }
  //create a new feature
  @Post()
  @ApiResponse({ status: 201, description: 'Feature created', type: Feature })
  create(@Body() createFeatureDto: CreateFeatureDto): Promise<Feature> {
    return this.featuresService.create(createFeatureDto);
  }


   //get all feature
  @Get("getAllFeatures")
  @ApiOperation({ summary: 'List features' })
  @ApiResponse({
    status: 200,
    description: 'List of features',
    type: [Feature],
  })
  async findAll(): Promise<Feature[]> {
    return this.featuresService.findAll();
  }


  //upadate a feature by ID
  @Put(':id')
  @ApiOperation({ summary: 'Update a feature by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Feature ID',
  })
  @ApiBody({ type: UpdateFeatureDto, description: 'Update feature DTO' })
  @ApiResponse({ status: 200, description: 'Feature updated', type: Feature })
  updateById(
    @Param('id') id: string,
    @Body() updateFeatureDto: Partial<UpdateFeatureDto>,
  ): Promise<Feature | null> {
    return this.featuresService.updateById(id, updateFeatureDto);
  }

 
  //upadate a feature by ID
  @Get(':id')
  @ApiOperation({ summary: 'Update a feature by ID' })
  @ApiResponse({ status: 200, description: 'Feature updated', type: Feature })
  getFeatureById(@Param('id') id: string): Promise<Feature | null> {
    return this.featuresService.findById(id);
  }
  //delete a feature by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a feature by ID' })
  @ApiResponse({ status: 204, description: 'Feature deleted' })
  async deleteFeatureById(@Param('id') id: string): Promise<void> {
    return await this.featuresService.deleteById(id);
  }

  
}
