import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { SignUpUserDTO, signInUserDTO } from '@/@types';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthenticationService')
  signUp(data: SignUpUserDTO) {
    return this.authService.signUp(data);
  }

  @GrpcMethod('AuthenticationService')
  signIn(data: signInUserDTO) {
    return this.authService.signIn(data);
  }

}
