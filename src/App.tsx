import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationCenter } from './domains/notification/components/NotificationCenter.component';
import { PostListPage } from './domains/post/views/PostList.view';
import { CreatePostPage } from './domains/post/views/CreatePost.view';

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
