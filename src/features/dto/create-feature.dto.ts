import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FeatureCategory } from '../feature-category.enum';
export class CreateFeatureDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ enum: FeatureCategory, example: FeatureCategory.A })
  @IsEnum(FeatureCategory, { message: 'Category must be A, B, C, or OTHER' })
  @IsOptional()
  category?: FeatureCategory;

  @ApiProperty({ example: false })
  @IsOptional()
  isPremium?: boolean;
}
