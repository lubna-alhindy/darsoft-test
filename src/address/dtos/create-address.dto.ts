import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  street: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  locationDetails: string;
}
