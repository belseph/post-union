import React, { useState, useEffect } from 'react';
import PostCard from '../post/PostCard';
import { usePosts } from '../../hooks/usePosts';
import type { Post } from '../../types/post';

interface PostsContainerProps {
  selectedTag: string;
  currentUserId: string | null;
}

const PostsContainer: React.FC<PostsContainerProps> = ({ selectedTag, currentUserId }) => {
  const { 
    posts, 
    loading, 
    error, 
    fetchPosts, 
    handleReaction, 
    handleCommentReaction,
    handleNewComment
  } = usePosts({ currentUserId });
  
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (selectedTag === 'all') {  
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.tags.includes(selectedTag)));
    }
  }, [selectedTag, posts]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          <p className="text-white/80 font-medium">Cargando posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-300">
        <p>{error}</p>
        <button onClick={fetchPosts} className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 cursor-pointer">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📝</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No hay posts para mostrar</h3>
          <p className="text-white/70">Intenta cambiar el filtro o crea el primer post</p>
        </div>
      ) : (
        filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUserId={currentUserId}
            onReaction={handleReaction}
            onCommentReaction={handleCommentReaction}
            onNewComment={handleNewComment}
          />
        ))
      )}
    </div>
  );
};

export default PostsContainer;