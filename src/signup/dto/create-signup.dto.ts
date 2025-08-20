import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PhoneNumberType } from '../enums/phone-number-type.enum'; // Assuming you have a PhoneNumberType enum defined



export class CreateSignupDto {

    @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
    @IsString()
    @IsNotEmpty({ message: 'Full name is required' })
    fullName: string;

    @ApiProperty({ example: '123 Main St, City, Country', description: 'Address of the user' })

    @IsString()
    @IsNotEmpty({ message: 'Address is required' })
    address: string;
    @ApiProperty()

    @ApiProperty({ example: '123 Main St, City, Country', description: 'phone Number of the user' })

    @IsString()
    @Matches(/^[0-9]{10}$/, { message: 'Phone number must be a 10-digit number' })
    phoneNumber: number;
    @ApiProperty()

    @ApiProperty({
        example: PhoneNumberType.PERSONAL,
        description: 'Type of phone number',
        enum: PhoneNumberType,
    })
    @IsEnum(PhoneNumberType, {
        message:
            'Invalid phone number type. Please use one of: personal, whatsapp, work, other.',
    })
    phoneNumberType: PhoneNumberType;


    @ApiProperty({ example: 'xyz@gmail.com', description: 'email of the user' })

    @IsEmail({}, { message: 'Please enter a valid email address' })
    email: string;
    @ApiProperty()


    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
