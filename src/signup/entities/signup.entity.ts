import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { PhoneNumberType } from "../enums/phone-number-type.enum"; // Assuming you have a PhoneNumberType enum defined 
export type SignupDocument = Signup & Document & {
    _id: Types.ObjectId;
};



@Schema({
    timestamps: true,
    collection: 'signups',
})
export class Signup {
    @Prop({ required: true, trim: true })
    fullName: string;

    @Prop({ required: true, trim: true })
    address: string;

    @Prop({ required: true, unique: true, trim: true })
    phoneNumber: number;


    @Prop({
        required: false,
        enum: PhoneNumberType,
        default: PhoneNumberType.PERSONAL,
    })
    phoneNumberType: PhoneNumberType;
    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop({ type: Date })
    lastUpdatedAt?: Date;

    @Prop({ type: String })
    lastUpdatedBy?: string;
}

export const SignupSchema = SchemaFactory.createForClass(Signup);

// ✅ Add indexes for better performance
SignupSchema.index({ createdAt: -1 });
SignupSchema.index({ updatedAt: -1 });
SignupSchema.index({ email: 1 }, { unique: true });
SignupSchema.index({ phoneNumber: 1 }, { unique: true });
