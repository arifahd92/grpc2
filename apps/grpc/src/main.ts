import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  console.log('dirname', __dirname);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'hero',
        protoPath: join(__dirname, './hero/proto/hero.proto'), //C:\Users\Md Arif\Desktop\grpc\dist\apps\grpc\hero\hero.proto
      },
    },
  );
  await app.listen();
}
bootstrap();
