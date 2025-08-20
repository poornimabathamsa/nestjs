import { PartialType } from '@nestjs/mapped-types';
import { CreateFeatureDto } from './create-feature.dto';
import { ApiProperty } from '@nestjs/swagger';
import { FeatureCategory } from '../feature-category.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateFeatureDto extends PartialType(CreateFeatureDto) {
      @ApiProperty({ example: 'Advanced Search' })
      name: string;

      @ApiProperty({ example: 'Allows users to search with advanced filters' })
      description: string;

      @ApiProperty({ enum: FeatureCategory, example: FeatureCategory.A })
      @IsEnum(FeatureCategory, { message: 'Category must be A, B, C, or OTHER' })
      @IsOptional()
      category?: FeatureCategory;

      @ApiProperty({ example: true, required: false })
      isPremium?: boolean;

      @ApiProperty({ example: 'active', required: false })
      status?: string;

      @ApiProperty({ example: '2025-08-19T10:00:00.000Z', required: false })
      lastUpdatedAt?: Date;

      @ApiProperty({ example: 'admin', required: false })
      lastUpdatedBy?: string;
}
