import { Test, TestingModule } from '@nestjs/testing';
import { UserHelperService } from '../service/user-helper/user-helper.service';
import { UserService } from '../service/user-service/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  const mockHelperService = {
    createUserDtoToEntity: jest.fn((dto) => {
      return {
        email: dto.email,
        username: dto.username,
        password:  dto.password,
        googleUser: dto.googleUser
      }
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
    }))
  }


  const newUser = {
    username: 'Marius',
    email: 'test@test.com',
    password: null,
    googleUser: true
  }

  const newUser1 = {
    username: 'Marius',
    email: 'test@test.com',
    password: null,
    googleUser: true
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
      {
        provide: UserService,
        useValue: mockUserService
      },
      {
        provide: UserHelperService,
        useValue: mockHelperService
      }],
    })
    .compile();

    controller = module.get<UserController>(UserController);
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
  it('return all users', () => {
    expect(controller.findAll()).toEqual([newUser,newUser1])
  })

  it('should update user', () => {
    const dto = mockHelperService.createUserDtoToEntity(newUser);
    expect(controller.updateUser(1, dto)).toEqual({
      id: 1,
      ...dto
    })

    expect(mockUserService.updateUser).toHaveBeenCalled();
  })
});
