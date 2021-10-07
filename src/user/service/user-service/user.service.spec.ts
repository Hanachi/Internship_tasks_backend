import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../auth/services/auth.service';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../../user/models/user.entity';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
      {
        provide: AuthService,
        useValue: {}
      },
      {
        provide: getRepositoryToken(UserEntity),
        useClass: Repository
      }
    ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
