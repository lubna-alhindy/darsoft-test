import { IsDefined, IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @IsString()
  @Length(3, 64)
  @ApiProperty({
    required: true,
    example: 'lubna alhindy'
  })
  fullName: string;

  @IsEmail()
  @IsString()
  @ApiProperty({
    required: true,
    example: 'lubna@darsoft.com'
  })
  email: string;

  @IsString()
  @Length(8, 32)
  @ApiProperty({
    required: true,
    example: '12345678'
  })
  password: string;
}
