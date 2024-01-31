import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash } from 'bcrypt';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

export const repositoryMockFactory: () => MockType<Repository<Users>> = jest.fn(
  () => ({
    findOneBy: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => [entity]),
    insert: jest.fn(),
  }),
);

describe('UsersService', () => {
  let usersService: UsersService;
  let authService: AuthService;
  let repositoryMock: MockType<Repository<Users>>;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useFactory: repositoryMockFactory,
        },
        AuthService,
        JwtService,
      ],
    }).compile();

    usersService = userModule.get<UsersService>(UsersService);
    authService = userModule.get<AuthService>(AuthService);
    repositoryMock = userModule.get(getRepositoryToken(Users));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should sign up user', async () => {
    const userEntity = {
      id: 1,
      username: 'test',
      email: 'test@gmail.com',
      phone: '+84345123678',
      firstname: 'firstname',
      lastname: 'lastname',
      password: 'Password@123',
    };

    const mockToken = 'token';

    repositoryMock.find.mockReturnValue([]);
    repositoryMock.insert.mockReturnValue({
      identifiers: [userEntity.id],
    });
    repositoryMock.findOneBy.mockReturnValue(userEntity);

    jest.spyOn(authService, 'createToken').mockImplementation(() => mockToken);

    expect(
      await usersService.signUp(
        pick(userEntity, [
          'email',
          'firstname',
          'lastname',
          'phone',
          'username',
          'password',
        ]),
      ),
    ).toEqual({
      ...pick(userEntity, ['firstname', 'lastname', 'id', 'username']),
      token: mockToken,
    });

    expect(repositoryMock.find).toHaveBeenCalled();
    expect(repositoryMock.findOneBy).toHaveBeenCalled();
    expect(repositoryMock.insert).toHaveBeenCalled();
  });

  it('Should log user in', async () => {
    const rawPassword = 'Password@123';

    const salt = await genSalt();
    const hashedPassword = await hash(rawPassword, salt);

    const userEntity = {
      id: 1,
      username: 'test',
      email: 'test@gmail.com',
      phone: '+84345123678',
      firstname: 'firstname',
      lastname: 'lastname',
      password: hashedPassword,
    };

    const mockToken = 'token';

    repositoryMock.findOne.mockReturnValue(userEntity);

    jest.spyOn(authService, 'createToken').mockImplementation(() => mockToken);

    expect(
      await usersService.logIn({
        userIdentifier: userEntity.email,
        password: rawPassword,
      }),
    ).toEqual({
      ...pick(userEntity, ['firstname', 'lastname', 'id', 'username']),
      token: mockToken,
    });

    expect(repositoryMock.findOne).toHaveBeenCalled();
  });
});
