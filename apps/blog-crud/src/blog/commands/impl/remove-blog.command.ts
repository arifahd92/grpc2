export class RemoveBlogCommand {
  constructor(
    public readonly id: { id: 'string' },
    public readonly token: string,
  ) {}
}
