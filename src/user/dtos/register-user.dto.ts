import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @IsString()
  @Length(3, 64)
  @ApiProperty({
    required: true,
  })
  fullName: string;

  @IsEmail()
  @IsString()
  @ApiProperty({
    required: true,
  })
  email: string;

  @IsString()
  @Length(8, 32)
  @ApiProperty({
    required: true,
  })
  password: string;
}
