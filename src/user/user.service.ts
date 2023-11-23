import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';

import * as bcrypt from 'bcrypt';
import { PayloadModel } from './models/payload.model';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(body: RegisterUserDto) {
    let user = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });
    if (user) {
      throw new BadRequestException('This account already exist');
    }

    return await this.userRepository.save(
      this.userRepository.create({
        email: body.email,
        password: await bcrypt.hash(body.password, await bcrypt.genSalt()),
        profile: {
          fullName: body.fullName,
        },
      }),
    );
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<null | User> {
    const user = await this.userRepository.findOneBy({
      email: email,
    });
    if (!user || !(await user.validatePassword(password))) return null;
    return user;
  }

  async login(user: User) {
    const payload: PayloadModel = {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    return {
      accessToken: this.jwtService.sign({
        sub: payload,
      }),
    };
  }

  async updateUserProfile(body: UpdateUserProfileDto, id: string) {
    const user = await this.userRepository.findOne({
      where: {
        _id: new ObjectId(id),
      },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, body);

    return await this.userRepository.save(user);
  }
}
