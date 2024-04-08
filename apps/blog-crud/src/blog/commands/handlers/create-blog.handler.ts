import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { Blog, blogArray, blogResponse } from '@app/common';

import { CreateBlogCommand } from '../impl/create-blog.command';
import { blogArray } from 'db/blog/blog-array';
import { randomUUID } from 'crypto';

@CommandHandler(CreateBlogCommand)
export class CreateBlogCommandHandler
  implements ICommandHandler<CreateBlogCommand>
{
  async execute(command: CreateBlogCommand) {
    try {
      const { createBlogDto, token } = command;
      console.log(createBlogDto, token);
      const blog = {
        ...createBlogDto,
        id: randomUUID(),
      };
      blogArray.push(blog);
      return {
        message: 'success fully added',
        error: 'null',
        Blog: blog,
      };
    } catch (error) {
      return {
        message: 'something went wrong',
        error: 'try again',
        Blog: null,
      };
    }
  }
}
