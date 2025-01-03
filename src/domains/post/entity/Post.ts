export class Post {
  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public readonly authorId: string,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}

  updateContent(newTitle: string, newContent: string): void {
    if (!this.isValidTitle(newTitle)) {
      throw new Error('Invalid title format');
    }
    if (!this.isValidContent(newContent)) {
      throw new Error('Invalid content format');
    }

    this.title = newTitle;
    this.content = newContent;
    this.updatedAt = new Date();
  }

  private isValidTitle(title: string): boolean {
    return title.length >= 3 && title.length <= 100;
  }

  private isValidContent(content: string): boolean {
    return content.length > 0 && content.length <= 5000;
  }
}
