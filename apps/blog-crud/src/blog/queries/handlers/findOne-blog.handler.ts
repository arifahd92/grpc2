import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
// import { FindOneQuery } from "../impl/findOne.query";
// import { blogArray, userArray } from '@app/common';
import { FindOneQuery } from '../impl/findOne-blog.query';
import { blogArray } from 'db/blog/blog-array';
// import { JwtService } from '@nestjs/jwt';

@QueryHandler(FindOneQuery)
export class FindOneCommandHandler implements IQueryHandler {
  // constructor(private jwtService: JwtService) {}

  async execute(query: any) {
    const { id, token } = query;

    console.log(`printing query`);
    const blog = blogArray.filter((item) => item.id == id.id);
    return blog[0];
  }
}
