// import { CreateBlogDto, UpdateBlogDto } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogCommand } from './commands/impl/create-blog.command';
import { FindAllQuery } from './queries/impl/findAll-blog.query';
import { FindOneQuery } from './queries/impl/findOne-blog.query';
import { UpdateBlogCommand } from './commands/impl/update-blog.command';
import { RemoveBlogCommand } from './commands/impl/remove-blog.command';
import { ClientGrpc } from '@nestjs/microservices';
// import { blog } from './proto/blog';
// import { auth } from 'apps/auth/src/proto/auth';
import { lastValueFrom } from 'rxjs';
import { CreateBlogDto, UpdateBlogDto } from './proto/blog';
import { AdminServiceClient } from 'apps/auth/src/proto/auth';

@Injectable()
export class BlogService implements OnModuleInit {
  private authProtoService: AdminServiceClient; // admin service is name of auth service inside auth proto, now it has access of all rpc method of auth proto

  constructor(
    @Inject('AUTH_SERVICE') private client: ClientGrpc,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  onModuleInit() {
    this.authProtoService =
      this.client.getService<AdminServiceClient>('AdminService');
  }
  async verification(token: string): Promise<any> {
    const verificationResult = await lastValueFrom(
      this.authProtoService.verify({ token }),
    ); // this will go first inside auth controller then will go in service of auth module, thats why token is passed as object

    return verificationResult;
  }
  async create(createBlogDto: CreateBlogDto, token: any): Promise<any> {
    try {
      const verificationResult = await this.verification(token);

      if (verificationResult.value && verificationResult.role === 'admin') {
        console.log(
          'verification success you can create perform write operation ',
        );
        return this.commandBus.execute(
          new CreateBlogCommand(createBlogDto, token),
        );
      } else {
        console.log('inside else create ');
        return {
          message: 'Invalid token or user is not authorized.',
          error: 'some thing went wrong',
          Blog: [],
        };
      }
    } catch (error) {
      // throw new Error('Error verifying token: ' + error.message);
      console.log('inside catch block');
      return {
        message: 'Invalid token or user is not authorized.',
        error: 'some thing went wrong',
        blog: [],
      };
    }
  }

  async findAll(token: any) {
    const verificationResult = await this.verification(token);
    console.log({ verificationResult });
    if (verificationResult.value)
      // any one either admin or employee can perform read operation with valid data
      return this.queryBus.execute(new FindAllQuery(token));
  }

  async findOne(id: string, token: any) {
    const verificationResult = await this.verification(token);
    console.log({ verificationResult });
    if (verificationResult.value) {
      return this.queryBus.execute(new FindOneQuery(id, token));
    } else {
      return {
        message: 'Invalid token or user is not authorized.',
        error: 'some thing went wrong',
        blog: [],
      };
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, token: any) {
    const verificationResult = await this.verification(token);

    if (verificationResult.value && verificationResult.role === 'admin') {
      return this.commandBus.execute(
        new UpdateBlogCommand(id, updateBlogDto, token),
      );
    } else {
      return {
        message: 'Invalid token or user is not authorized.',
        error: 'some thing went wrong',
        blog: [],
      };
    }
  }

  async remove(id: any, token: any) {
    console.log(`inside remove service`);
    const verificationResult = await this.verification(token);

    if (verificationResult.value && verificationResult.role === 'admin') {
      return this.commandBus.execute(new RemoveBlogCommand(id, token));
    } else {
      return {
        message: 'Invalid token or user is not authorized.',
        error: 'some thing went wrong',
        blog: [],
      };
    }
  }
}
