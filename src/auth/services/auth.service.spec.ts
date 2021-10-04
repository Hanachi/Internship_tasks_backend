import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

const bcrypt = require('bcrypt');

class JWTMockService {
  signAsync = () => {
    return 
  }
}


describe('AuthService', () => {
  let service: AuthService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, 
      {
        provide: JwtService,
        useValue: {}
      }],
    }).compile();
  
    service = module.get<AuthService>(AuthService);
  });

  it('Password are hashed after signUp', () => {
    const pass = 'mypass';
    const hash =  service.hashPassword(pass);
    hash.subscribe(val => expect(val).toMatch('$2b$12$'));
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
