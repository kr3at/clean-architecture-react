import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PostListPage } from './domains/post/views/PostList';
import { CreatePostPage } from './domains/post/views/CreatePost';
import { NotificationCenter } from './domains/notification/components/NotificationCenter';

function App() {
  return (
    <BrowserRouter>
      <NotificationCenter/>
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/posts/create" element={<CreatePostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
