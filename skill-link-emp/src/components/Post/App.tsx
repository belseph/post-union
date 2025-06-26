import { useState } from 'react';
import PostsContainer from './components/layout/PostsContainer';
import CreatePostModal from './components/forms/CreatePostModal';
import Header from './components/layout/Header';

function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [currentUserId] = useState<string | null>('1');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-600 to-purple-700">
      <Header
        onCreatePost={() => setIsCreateModalOpen(true)}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
      />

      <main className="container mx-auto px-4 py-8">
        <PostsContainer
          selectedTag={selectedTag}
          currentUserId={currentUserId}
        />
      </main>

      {isCreateModalOpen && (
        <CreatePostModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
}

export default App;