import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserLoginInDto, UserSignUpDto } from './users.dto';
import { AuthenticationGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('sign-up')
  async signUp(@Body() userSignUpDto: UserSignUpDto) {
    return this.userService.signUp(userSignUpDto);
  }

  @Post('login')
  async logIn(@Body() userLoginInDto: UserLoginInDto) {
    return this.userService.logIn(userLoginInDto);
  }

  @Get('current')
  @UseGuards(AuthenticationGuard)
  async getLoggedInUser(@Request() req: any) {
    return req.user;
  }
}
