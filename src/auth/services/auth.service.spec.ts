import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth.service';

const bcrypt = require('bcrypt');

const token = 'sdfjh53434hr23jngsdfsdf';

const JWTMockService = {
  signAsync: jest.fn((userDto) => {
    return token
  })
}

const userDto = {
  username: 'Marius',
  email: 'test@test.com',
  password: null,
  googleUser: false
}

const mockAuthService = {
  generateJWT: JWTMockService.signAsync(userDto),
  hashPassword: jest.fn((pass): Observable<string> => {
    return from<string>(bcrypt.hash(pass, 12));
  })
}


describe('AuthService', () => {
  let service: AuthService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
      {
        provide: AuthService,
        useValue: mockAuthService
      }, 
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
    expect(mockAuthService.hashPassword).toHaveBeenCalled()
    hash.subscribe(val => expect(val).toMatch('$2b$12$'));
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate JWT', () => {
    expect(service.generateJWT).toEqual(token);
    expect(JWTMockService.signAsync).toHaveBeenCalled()
  })

});
