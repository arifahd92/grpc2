import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: join(__dirname, './proto/auth.proto'),
        url: 'localhost:5555',
      },
    },
  );
  // app.useGlobalPipes(new ValidationPipe()); // this will enforce class validator dto to match defined dto

  app.listen();
  console.log('auth main is listening at port 5555');
}
bootstrap();
