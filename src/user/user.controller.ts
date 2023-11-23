import {
  Body,
  Post,
  Patch,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { UserService } from './user.service';

import { RegisterUserDto } from './dtos/register-user.dto';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { LoginRequestModel } from './models/login-request.model';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { Serialize } from 'src/util/serialize.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('register')
  @Serialize<User>(User)
  registerUser(@Body() body: RegisterUserDto) {
    return this.service.registerUser(body);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  login(@Request() req: LoginRequestModel) {
    return this.service.login(req.user);
  }

  @Patch()
  @Serialize<User>(User)
  @UseGuards(JWTAuthGuard)
  updateUserProfile(@Body() body: UpdateUserProfileDto, @Request() req: any) {
    return this.service.updateUserProfile(body, req.user.sub._id);
  }
}
