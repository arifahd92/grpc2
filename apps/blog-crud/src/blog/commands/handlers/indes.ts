import { CreateBlogCommandHandler } from './create-blog.handler';
import { RemoveBlogCommandHandler } from './remove-blog.handler';
import { UpdateBlogCommandHandler } from './update-blog.handler';

export const CommandHandlers = [
  CreateBlogCommandHandler,
  UpdateBlogCommandHandler,
  RemoveBlogCommandHandler,
];
