import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Signup  } from './entities/signup.entity'; // Assuming you have a Signup entity defined
@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Signup created', type: Signup })

  create(@Body() createSignupDto: CreateSignupDto): Promise<Signup | { message: string; statusCode: number; }> {
  return this.signupService.create(createSignupDto);
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
