import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsString()
  @ApiProperty({
    example:'system@darsoft.com'
  })
  email: string;

  @IsString()
  @Length(8, 32)
  @ApiProperty({
    example:'12345678'
  })
  password: string;
}
