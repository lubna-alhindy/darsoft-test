import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  Length,
  IsString,
  IsOptional,
  IsDateString,
  IsNumberString,
} from 'class-validator';
import { gender } from '../enum/gender.enum';
import { splitEnum } from 'src/util/split-enum';

export class UpdateUserProfileDto {
  @IsString()
  @Length(3, 64)
  @IsOptional()
  @ApiProperty({ required: false })
  fullName: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  birthday: string;

  @IsOptional()
  @ApiProperty({ required: false })
  country: string;

  @IsOptional()
  @ApiProperty({
    enum: splitEnum(gender),
    required: false,
  })
  @IsEnum(splitEnum(gender))
  gender: string;

  @IsNumberString()
  @Length(10, 10)
  @IsOptional()
  @ApiProperty({ required: false })
  phoneNumber: string;
}
