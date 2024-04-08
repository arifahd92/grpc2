import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindAllQuery } from '../impl/findAll-blog.query';
import { blogArray } from 'db/blog/blog-array';

// import { blogArray } from 'db/user/user-array';

@QueryHandler(FindAllQuery)
export class FIndAllCommandHandler implements IQueryHandler {
  // constructor(private jwtService: JwtService) {}
  async execute(query: any) {
    const { token } = query;
    return { blogs: blogArray };
  }
}
