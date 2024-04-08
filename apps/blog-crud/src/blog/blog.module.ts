import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers/indes';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ConfigModule, ConfigService } from '@nestjs/config';
console.log(__dirname);
@Module({
  imports: [
    CqrsModule,
    JwtModule.register({
      global: true,
    }),

    ClientsModule.register([
      //registers a client module for communication with external services using gRPC or other transports.
      {
        name: 'AUTH_SERVICE', //This specifies the name of the client service. It's used as an identifier for this client within the application
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../auth/proto/auth.proto'), //C:\Users\Md Arif\Desktop\grpc\dist\apps\auth\proto\auth.proto
          url: 'localhost:5555',
        },
      },
    ]),
  ],

  controllers: [BlogController],
  providers: [BlogService, ...QueryHandlers, ...CommandHandlers],
})
export class BlogModule {}
