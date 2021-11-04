import { HttpException, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundError, of } from 'rxjs';
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
    })

  }

  const mockUserService = {
    create: jest.fn((newUser) => {
     const dto = mockHelperService.createUserDtoToEntity(newUser)
      return {
        id: Date.now(),
        ...dto
      }
    }),
    findAll: jest.fn(() => {
      return [newUser, newUser1]
    }),
    updateUser: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto
    })),
    // validateUser: jest.fn((email, password) => {
    //   if(foundUser.email == email) {
    //     return findOne.mockReturnValue(Promise.resolve(foundUser))
    //   } else {
    //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    //   }

    // })
  }


  const newUser = {
    username: 'Marius',
    email: 'test@test.com',
    password: null,
    role: 'admin',
    googleUser: true
  }

  const foundUser = {
    id: 2,
    username: 'Jack',
    email: 'test@test.com',
    password: null,
    role: UserRole.USER,
    googleUser: true
  }

  const newUser1 = {
    username: 'Marius',
    email: 'test@test.com',
    password: null,
    role: 'user',
    googleUser: true
  }

  beforeEach(async () => {
    findOne = jest.fn();
    find = jest.fn();
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
            find
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
  it('should create a new user', () => {
    const dto = mockHelperService.createUserDtoToEntity(newUser);
    expect(mockUserService.create(newUser)).toEqual({
      id: expect.any(Number),
      ...newUser
    });
    expect(mockHelperService.createUserDtoToEntity).toHaveBeenCalled();
    expect(mockUserService.create).toHaveBeenCalledWith(dto);
  })
  // it('return all users', () => {
  //   expect(controller.findAll()).toEqual([newUser,newUser1])
  // })

  // it('should update user', () => {
  //   const dto = mockHelperService.createUserDtoToEntity(newUser);
  //   expect(controller.updateUser(1, dto)).toEqual({
  //     id: 1,
  //     ...dto
  //   })
  //   expect(mockUserService.updateUser).toHaveBeenCalled();
  // })

  // it('user not found', () => {
  //   let user: UserEntity = foundUser;
  //   beforeEach(() => {
  //     findOne.mockReturnValue(Promise.resolve(user));
  //   })
  // })

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
