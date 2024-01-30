import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UserLoginInDto, UserSignUpDto } from './users.dto';
import { AuthService } from '../auth/auth.service';
import { genSalt, hash, compare } from 'bcrypt';
import { pick } from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Users | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async signUp(userSignUpDto: UserSignUpDto) {
    const existingUser = await this.usersRepository.find({
      where: [
        { username: userSignUpDto.username },
        { email: userSignUpDto.email },
        { phone: userSignUpDto.phone },
      ],
    });

    if (existingUser.length > 0) {
      throw new BadRequestException('Email or username exists');
    }

    const salt = await genSalt();
    const hashedPassword = await hash(userSignUpDto.password, salt);

    const insertedResult = await this.usersRepository.insert({
      ...userSignUpDto,
      salt,
      password: hashedPassword,
    });

    const insertedId = insertedResult.identifiers[0].id;

    const newUser = await this.usersRepository.findOneBy({
      id: insertedId,
    });

    return {
      ...pick(newUser, ['id', 'username', 'firstname', 'lastname']),
      token: this.authService.createToken(newUser),
    };
  }

  async logIn(userLoginInDto: UserLoginInDto) {
    const existingUser = await this.usersRepository.findOne({
      where: [
        { username: userLoginInDto.userIdentifier },
        { email: userLoginInDto.userIdentifier },
        { phone: userLoginInDto.userIdentifier },
      ],
    });

    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    const passwordMatched = await compare(
      userLoginInDto.password,
      existingUser.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Password not matched');
    }

    return {
      ...pick(existingUser, ['id', 'username', 'firstname', 'lastname']),
      token: this.authService.createToken(existingUser),
    };
  }

  async getLoggedInUser() {}
}
