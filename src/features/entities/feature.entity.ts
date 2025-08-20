import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FeatureCategory } from '../feature-category.enum';
export type FeatureDocument = Feature & Document & {
  _id: Types.ObjectId;
};

@Schema({
  timestamps: true,
  collection: 'features',
})
export class Feature {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  // ✅ Use enum here
  @Prop({
    type: String,
    enum: FeatureCategory,
    default: FeatureCategory.OTHER,
  })
  category: FeatureCategory;

  @Prop({ type: Boolean, default: false })
  isPremium: boolean;

  @Prop({ type: Date })
  lastUpdatedAt?: Date;

  @Prop({ type: String })
  lastUpdatedBy?: string;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);

// ✅ Add indexes
FeatureSchema.index({ category: 1 });
FeatureSchema.index({ name: 1 });
FeatureSchema.index({ createdAt: -1 });
