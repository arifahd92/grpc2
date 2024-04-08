import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { auth } from './proto/auth';
import { UserDB } from 'db/user/user-array';
import { SignInResponse, Status, Token, User } from './proto/auth';
import { UserDto } from './dto/user.dto';
// import { Status, Token, User } from 'proto/auth';

@Injectable()
export class AuthService {
  private readonly db = UserDB;

  constructor(private jwtService: JwtService) {}

  async signIn(data: UserDto): Promise<SignInResponse> {
    const { id, username, password, role } = data;
    const index = UserDB.findIndex(
      (item) =>
        item.id == id &&
        item.username == username &&
        item.password === password,
    );
    if (index == -1) {
      return { error: 'you are not a registered user' };
    }
    const payload = {
      sub: id,
      username: username,
      password: password,
      role: role,
    };
    const access_token = await this.jwtService.signAsync(payload);
    console.log({ access_token });
    return { token: access_token };
  }

  async verify(token: any): Promise<Status> {
    try {
      // console.log('THIS IS VERIFY');
      console.log('THIS IS token', token);

      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'JWT_SECRET',
      });

      const userFromDb = this.db.find((user) => user.id === payload.sub);
      console.log(userFromDb, 'this is userFromDb');
      console.log(payload, 'this is payload');
      if (
        payload.username === userFromDb.username &&
        payload.password === userFromDb.password &&
        payload.role === userFromDb.role
      ) {
        console.log('This is verify TRUE');
        return { value: true, role: userFromDb.role };
      } else {
        return { value: false, role: 'undefined' };
      }
    } catch {
      console.log('SOmething went wrong while verifying');
      return { value: false, role: 'undefined' };
    }
  }
}
