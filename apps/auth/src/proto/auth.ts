/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'auth';

export interface SignInResponse {
  token?: string | undefined;
  error?: string | undefined;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface Token {
  token: string;
}

export interface Status {
  value: boolean;
  role: string;
}

export interface Error {
  message: string;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface AdminServiceClient {
  signIn(request: User): Observable<SignInResponse>;

  verify(request: Token): Observable<Status>;
}

export interface AdminServiceController {
  signIn(
    request: User,
  ): Promise<SignInResponse> | Observable<SignInResponse> | SignInResponse;

  verify(request: Token): Promise<Status> | Observable<Status> | Status;
}

export function AdminServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['signIn', 'verify'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AdminService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AdminService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const ADMIN_SERVICE_NAME = 'AdminService';
