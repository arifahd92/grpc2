import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { join } from 'path';
import { BlogCrudModule } from './blog-crud.module';

async function bootstrap() {
  console.log('dirname', __dirname);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BlogCrudModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, './blog/proto/blog.proto'), // proto path
        package: 'blog', // mentioned in proto
        url: 'localhost:5060',
      },
    },
  );
  await app.listen();
  console.log('blog main listening at port 5060');
}
bootstrap();
