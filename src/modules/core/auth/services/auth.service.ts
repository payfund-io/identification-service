import { SignUpUserDTO, signInUserDTO } from '@/@types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signUp(data: SignUpUserDTO) {
    return data;
  }

  signIn(data: signInUserDTO) {}
}
