import { Test, TestingModule } from '@nestjs/testing';
import { UserHelperService } from '../service/user-helper/user-helper.service';
import { UserService } from '../service/user-service/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
      {
        provide: UserService,
        useValue: {}
      },
      {
        provide: UserHelperService,
        useValue: {}
      }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
