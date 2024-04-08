import { Module } from '@nestjs/common';

import { BlogModule } from './blog/blog.module';
// this is  just app module will be imported in main file
@Module({
  imports: [BlogModule],
  controllers: [],
  providers: [],
})
export class BlogCrudModule {}
