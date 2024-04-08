import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JwtService } from '@nestjs/jwt';

import { UpdateBlogCommand } from '../impl/update-blog.command';
import { blogArray } from 'db/blog/blog-array';

@CommandHandler(UpdateBlogCommand)
export class UpdateBlogCommandHandler
  implements ICommandHandler<UpdateBlogCommand>
{
  constructor(private jwtService: JwtService) {}

  async execute(command: UpdateBlogCommand) {
    const { updateBlogDto, token } = command;
    // let { id, token } = command;
    const index = blogArray.findIndex((item) => item.id === updateBlogDto.id);
    console.log({ index });
    if (index != -1) {
      const target = blogArray[index];
      console.log({ target });
      blogArray.splice(index, 1, updateBlogDto);
      console.log('going to return updated blog dto');
      console.log(updateBlogDto);
      return updateBlogDto;
    }
    return {
      content: 'not found ',
      author: 'not found',
    };
  }
}
