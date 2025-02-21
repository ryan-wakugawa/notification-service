export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validadeContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content:string) {
    const isContentLengthValid = this.validadeContentLength(content);

    if (!isContentLengthValid){
        throw new Error('content length error')
    }

    this.content = content
  }
}
