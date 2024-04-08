// import { UpdateBlogDto } from "@app/common";

import { UpdateBlogDto } from '../../proto/blog';

// import { UpdateBlogDto } from 'proto/blog';

export class UpdateBlogCommand {
  constructor(
    public readonly id: string,
    public readonly updateBlogDto: UpdateBlogDto,
    public readonly token: string,
  ) {}
}
