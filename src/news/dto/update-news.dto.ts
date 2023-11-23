import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNewsDto {
  @IsString()
  @Length(1, 64)
  @ApiProperty({
    required: false,
  })
  title: string;

  @IsString()
  @ApiProperty({
    required: false,
  })
  description: string;
}
