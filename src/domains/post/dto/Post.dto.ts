export namespace PostDTO {
  export interface Create {
    title: string;
    content: string;
    authorId: string;
  }

  export interface Update {
    title?: string;
    content?: string;
  }

  export interface PostResponse {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

