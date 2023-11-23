import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/create-address.dto';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createAddress(body: CreateAddressDto, id: string) {
    const address = this.addressRepository.create({
      city: body.city,
      name: body.name,
      street: body.street,
      userId: id,
      locationDetails: body.locationDetails,
    });

    return await this.addressRepository.save(address);
  }

  async getAllUserAddress(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        _id: new ObjectId(userId),
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return await this.addressRepository.find({
      where: {
        userId: userId,
      },
    });
  }

  async deleteAddress(id: string, userId: string) {
    const address = await this.addressRepository.findOne({
      where: {
        _id: new ObjectId(id),
      },
    });

    if (!address) {
      throw new NotFoundException('address not found');
    }

    if (userId !== address.userId) {
      throw new UnauthorizedException('unauthorized');
    }

    await this.addressRepository.remove(address);

    return {
      message: 'deleted successfully',
    };
  }
}
