import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { hero } from './proto/hero';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
@Controller()
export class HeroesController {
  @GrpcMethod('HeroesService', 'FindOne')
  findOne(
    data: hero.HeroById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): hero.Hero {
    console.log(data);
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
