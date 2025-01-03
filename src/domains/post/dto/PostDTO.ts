export interface CreatePostDTO {
  title: string;
  content: string;
  authorId: string;
}

export interface UpdatePostDTO {
  title?: string;
  content?: string;
}

export interface PostResponseDTO {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}
