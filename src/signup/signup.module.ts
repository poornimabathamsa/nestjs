import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { Signup  ,SignupSchema} from './entities/signup.entity'; // Assuming you have a Signup entity defined
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signup.name, schema: SignupSchema }]),
  ],
  controllers: [SignupController],
  providers: [SignupService],
  exports: [SignupService], // ✅ Export if needed in other modules
})
export class SignupModule {}
