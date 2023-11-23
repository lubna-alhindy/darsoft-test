import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address.dto';
import { AddressService } from './address.service';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private service: AddressService) {}

  @Post()
  @UseGuards(JWTAuthGuard)
  createAddress(@Body() body: CreateAddressDto, @Request() req: any) {
    return this.service.createAddress(body, req.user.sub._id);
  }

  @Get(':userId')
  @UseGuards(JWTAuthGuard)
  getAllUserAddress(@Param('userId') userId: string) {
    return this.service.getAllUserAddress(userId);
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  deleteAddress(@Param('id') id: string, @Request() req: any) {
    return this.service.deleteAddress(id, req.user.sub._id);
  }
}
