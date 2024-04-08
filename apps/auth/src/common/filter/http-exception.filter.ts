import { RpcException } from '@nestjs/microservices';
import { Metadata, status } from '@grpc/grpc-js';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(BadRequestException)
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToRpc();
    const response = ctx.getContext();

    // Create metadata for the error
    const metadata = new Metadata();
    metadata.add('error-details', exception.message);

    // Throw a gRPC exception with the INVALID_ARGUMENT status code
    throw new RpcException({
      code: status.INVALID_ARGUMENT,
      message: exception.message,
      metadata: metadata,
    });
  }
}
