/*import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
// import { hero } from './proto/hero';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { blog } from 'proto/blog';
@Controller()
export class BlogController {
  @GrpcMethod('BlogsService', 'CreateBlog')
  create(
    data: CreateBlogDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): CreateBlogDto {
    console.log(data);

    return 
  }
}
*/
import { Controller } from '@nestjs/common';

import { BlogService } from './blog.service';

import { Metadata, MetadataValue, ServerUnaryCall } from '@grpc/grpc-js';

import { GrpcMethod } from '@nestjs/microservices';
import { CreateBlogDto, UpdateBlogDto } from './proto/blog';
// import { CreateBlogDto, UpdateBlogDto } from 'proto/blog';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @GrpcMethod('BlogsService', 'CreateBlog')
  createBlog(
    createBlogDto: CreateBlogDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    // console.log('metadata inside controller create blog');
    // console.log({ metadata });
    const token: MetadataValue[] | undefined = metadata.get('token');
    // console.log(token[0], 'inside controller');
    return this.blogService.create(createBlogDto, token[0]);
  }
  @GrpcMethod('BlogsService', 'FindAllBlogs')
  findAllBlogs(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log(`inside findAll blogs now metadata`);

    const token: MetadataValue[] | undefined = metadata.get('token');
    console.log(token[0], 'inside controller');

    return this.blogService.findAll(token[0]);
  }
  @GrpcMethod('BlogsService', 'FindOneBlog')
  findOneBlog(id: string, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log(`find one blog `);
    const token: MetadataValue[] | undefined = metadata.get('token');

    return this.blogService.findOne(id, token[0]);
  }
  @GrpcMethod('BlogsService', 'UpdateBlog')
  updateBlog(
    updateBlogDto: UpdateBlogDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    console.log(`update blog`);
    const token: MetadataValue[] | undefined = metadata.get('token');

    return this.blogService.update(updateBlogDto.id, updateBlogDto, token[0]);
  }
  @GrpcMethod('BlogsService', 'RemoveBlog')
  removeBlog(id: string, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log(`remove controller`);
    const token: MetadataValue[] | undefined = metadata.get('token');

    return this.blogService.remove(id, token[0]);
  }
}
