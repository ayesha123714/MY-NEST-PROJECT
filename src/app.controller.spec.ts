
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

describe('AuthController', () => {  // Renamed to 'AuthController'
  let authController: AuthController;  // Changed 'appController' to 'authController'

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);  // Updated variable name
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(authController.getHello()).toBe('Hello World!');  // Call on instance, not class
    });
  });
});
