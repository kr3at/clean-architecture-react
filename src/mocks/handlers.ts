import { http, HttpResponse } from 'msw'
import { Post } from '../domains/post/entity/Post'

const mockPosts = [
    {
        id: '0',
        title: 'Post 1',
        content: 'Content 1',
        authorId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '1',
        title: 'Post 2',
        content: 'Content 2',
        authorId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

export const handlers = [
  // GET posts by author
  http.get('http://localhost:3000/posts?authorId=1', ({ request }) => {
    const url = new URL(request.url);
    const authorId = url.searchParams.get('authorId');
    
    if (authorId) {
      const filteredPosts = mockPosts.filter(post => post.authorId === authorId);
      return HttpResponse.json(filteredPosts);
    }
    return HttpResponse.json(mockPosts);
  }),

  // GET single post
  http.get('/api/posts/:id', ({ params }) => {
    const post = mockPosts.find(p => p.id === params.id);
    if (post) {
      return HttpResponse.json(post);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // POST new post
  http.post('http://localhost:3000/posts', async ({ request }) => {
    const newPost = await request.json() as Post;
    mockPosts.push({
      ...newPost,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return HttpResponse.json(null, { status: 201 });
  }),

  // PUT update post
  http.put('/api/posts/:id', async ({ params, request }) => {
    const updates = await request.json() as Post;
    const postIndex = mockPosts.findIndex(p => p.id === params.id);
    
    if (postIndex > -1) {
      mockPosts[postIndex] = {
        ...mockPosts[postIndex],
        ...updates,
        updatedAt: new Date()
      };
      return HttpResponse.json(mockPosts[postIndex]);
    }
    return new HttpResponse(null, { status: 404 });
  })
] 
