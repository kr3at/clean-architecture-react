import { Post } from "../entity/Post";

export interface UpdatePostFieldParams {
  postId: string;
  field: keyof Post; // Esto asegura que solo podamos actualizar campos que existen en Post
  value: string;
}
