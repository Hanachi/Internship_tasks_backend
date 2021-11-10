import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { UserRole } from '../models/user.interface';
import { UserHelperService } from '../service/user-helper/user-helper.service';
import { UserService } from '../service/user-service/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let findOne: jest.Mock;
  let find: jest.Mock;
  let update: jest.Mock;
  let save: jest.Mock;

  class UserEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    role: UserRole
    googleUser: boolean;
  }

  const mockHelperService = {
    createUserDtoToEntity: jest.fn((dto) => {
      return {
        email: dto.email,
        username: dto.username,
        password:  dto.password,
        role: dto.role,
        googleUser: dto.googleUser
      }
    })
  }

  const mockAuthService = {

    validatePassword: jest.fn(() => {
      return of(true);
    }),

    hashPassword: jest.fn((password) => {
      return of('$2b$12$2X/ybbQbQ8Lm6IUkybvzleKmO.NNeTtVdS0sWpYGaNGfWksrf5DS2')
    })

  }

  const user1 = {
    username: 'Marius',
    email: 'test@test.com',
    password: null,
    role: UserRole.ADMIN,
    googleUser: true
  }

  const userToCreate = {
    username: 'NewUser',
    email: 'mail@test.com',
    password: 'Mypass123',
    role: UserRole.USER,
    googleUser: false
  }

  const createdUser = {
    username: 'NewUser',
    email: 'mail@test.com',
    role: UserRole.USER,
    googleUser: false
  }

  const foundUser = {
    id: 1,
    username: 'Jack',
    email: 'test@test.com',
    password: null,
    role: UserRole.USER,
    googleUser: true
  }

  const updatedUser = {
    id: 2,
    username: 'Andrew',
    role: UserRole.USER,
    googleUser: true
  }

  const userToUpdate = {
    username: 'Jack',
    email: 'test@test.com',
    password: null,
    role: UserRole.USER,
    googleUser: true
  }

  const user2 = {
    username: 'Marius',
    email: 'test@test.com',
    password: null,
    role: UserRole.USER,
    googleUser: true
  }

  beforeEach(async () => {
    findOne = jest.fn();
    find = jest.fn();
    update = jest.fn();
    save = jest.fn();
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,
        {
          provide: UserHelperService,
          useValue: mockHelperService
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne,
            find,
            update,
            save
          }
        },
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ],
    })
    .compile();

    controller = module.get<UserController>(UserController);
    service = await module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  it('should create new user', () => {
    jest.spyOn(service, 'mailExists').mockReturnValue(of(false))
    save.mockReturnValue(of(createdUser));
    const createUser = service.create(userToCreate);
    createUser.subscribe(val => expect(val).toEqual(createdUser));
    expect(mockAuthService.hashPassword).toHaveBeenCalledWith(userToCreate.password);
  })

  it('user already exists', () => {
    jest.spyOn(service, 'mailExists').mockReturnValue(of(true))
    const createUser = service.create(user1);
    const alreadyInUseError = new HttpException('Email is already in use', HttpStatus.CONFLICT);
    createUser.subscribe(val => console.log(val), err => expect(err).toEqual(alreadyInUseError));
  })
  
  it('return all users', () => {
    find.mockReturnValue(of([user1, user2]));
    const findAllUsers = service.findAll();
    findAllUsers.subscribe(val => expect(val).toEqual([user1, user2]))
  })

  it('should update user', () => {
    update.mockReturnValue(of(updatedUser));
    const serviceUpdateUser = service.updateUser(2, userToUpdate);
    serviceUpdateUser.subscribe(val => expect(val).toEqual({
      id: 2,
      ...updatedUser
    }))
  })

  it('success user validation', () => {
    let user: UserEntity = foundUser;
    findOne.mockReturnValue(of(user));
    const userVal = service.validateUser('test@test.com', null);
    const { password, ...result } = user;
    userVal.subscribe(val => expect(val).toEqual(result))
    expect(mockAuthService.validatePassword).toHaveBeenCalled();
  })

  it('failed user validation', () => {
    findOne.mockReturnValue(of(null));
    const NotFoundError = new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    const userVal = service.validateUser('test@test1.com', null);
    userVal.subscribe(val => console.log(val), e => expect(e).toEqual(NotFoundError))
  })
  
  it('Failed login', async () => {
    let user: UserEntity = foundUser;
    const UnauthorizedError = new HttpException('Login was not successful, wrong credentials', HttpStatus.UNAUTHORIZED);
    jest.spyOn(service, 'validateUser').mockReturnValue(of(null))
    const ser = service.login(user);
    ser.subscribe(val => console.log(val), e => expect(e).toEqual(UnauthorizedError));
  })
});
