import React from 'react';
import { useNotifications } from '../hook/useNotfications.hook';

export const NotificationCenter: React.FC = () => {
  const { recentPosts, notifications } = useNotifications();

  return (
    <div className="fixed top-4 right-4 w-64 bg-black shadow-lg rounded-lg">
      <div className="p-4 border-b">
        <h2 className="font-bold">Recent Activity</h2>
      </div>
      
      <div className="p-4 border-b bg-black">
        <h3 className="text-sm font-semibold mb-2">Latest Posts</h3>
        {recentPosts.map(post => (
          <div key={post.id} className="mb-2 text-sm">
            <p className="font-medium">{post.title}</p>
            <p className="text-gray-500 truncate">{post.content}</p>
          </div>
        ))}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold mb-2">Notifications</h3>
        {notifications.map(notif => (
          <div key={notif.id} className="text-sm mb-2 p-2 bg-black rounded">
            {notif.message}
          </div>
        ))}
      </div>
    </div>
  );
};
