import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(8, 32)
  @ApiProperty()
  password: string;
}
