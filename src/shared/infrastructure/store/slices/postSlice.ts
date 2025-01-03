import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { container } from 'tsyringe';
import { Post } from '../../../../domains/post/entity/Post';
import { CreatePostDTO } from '../../../../domains/post/dto/PostDTO';
import { CreatePostUseCase } from '../../../../domains/user/useCases/CreatePostUseCase';
import { GetPostsByAuthorUseCase } from '../../../../domains/post/useCases/GetPostsByAuthorUseCase';

// Definimos la estructura del estado
interface PostState {
  items: Record<string, Post>;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  items: {},
  loading: false,
  error: null
};

// Creamos nuestro thunk para crear posts
export const createPost = createAsyncThunk(
  'posts/create',
  async (data: CreatePostDTO) => {
    const createPostUseCase = container.resolve(CreatePostUseCase);
    const result = await createPostUseCase.execute(data);
    return result.post;
  }
);

export const loadAuthorPosts = createAsyncThunk(
  'post/loadByAuthor',
  //@ts-ignore
  async (authorId: string, { extra }) => {
    const getPostsUseCase = container.resolve(GetPostsByAuthorUseCase);
    const result = await getPostsUseCase.execute({ authorId })
    console.log('result', result)
    return result.posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString()
    })); 
  }
)

// Creamos nuestro slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        console.log('action', action.payload)
        // state.items[action.payload.id] = action.payload;
        // state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(loadAuthorPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAuthorPosts.fulfilled, (state, action: PayloadAction<{
        id: string;
        title: string;
        content: string;
        authorId: string;
        createdAt: string;
        updatedAt: string;
      }[]>) => {
        state.loading = false;
        action.payload.forEach(post => {
          state.items[post.id] = {
            ...post,
            createdAt: new Date(post.createdAt),
            updatedAt: new Date(post.updatedAt),
            updateContent: () => {} 
          };
        });
      })
      .addCase(loadAuthorPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load posts';
      });
  }
});

export const postReducer = postSlice.reducer;
