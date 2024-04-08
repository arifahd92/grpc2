// import { CreateBlogDto } from "@app/common";

import { CreateBlogDto } from '../../proto/blog';

export class CreateBlogCommand {
  constructor(
    public readonly createBlogDto: CreateBlogDto,
    public readonly token: string,
  ) {}
}
