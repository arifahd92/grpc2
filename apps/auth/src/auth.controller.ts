import { BadRequestException, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { AuthService } from './auth.service';
import {
  AdminServiceControllerMethods,
  SignInResponse,
  Status,
  Token,
  User,
} from './proto/auth';
import { UserDto } from './dto/user.dto';

@Controller()
@AdminServiceControllerMethods()
export class AuthController {
  constructor(private authService: AuthService) {}

  @GrpcMethod('AdminService', 'SignIn')
  async signIn(data: UserDto, metadata: Metadata): Promise<SignInResponse> {
    try {
      console.log(`sign in hit`);
      const response = await this.authService.signIn(data);
      return response;
    } catch (error) {
      throw new BadRequestException('Invalid user input');
    }
  }

  @GrpcMethod('AdminService', 'Verify')
  async verify(data: Token, metadata: Metadata): Promise<Status> {
    try {
      console.log(
        'your request came here first********************************',
      );
      const response = await this.authService.verify(data.token);
      return response;
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }
}
