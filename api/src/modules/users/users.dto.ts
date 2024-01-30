import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UserSignUpDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserLoginInDto {
  @IsString()
  @IsNotEmpty()
  userIdentifier: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
