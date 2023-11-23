import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddNewsDto {
  @IsString()
  @Length(1, 64)
  @ApiProperty({
    required: true,
  })
  title: string;

  @IsString()
  @ApiProperty({
    required: true,
  })
  description: string;
}
