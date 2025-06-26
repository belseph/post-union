import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { Post } from '../components/Post/types/post';

interface PostsContextType {
  posts: Post[];
  loading: boolean;
  error: string | null;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  shouldRefetch: boolean;
  markAsRefetched: () => void;
  invalidateCache: () => void;
  isInitialized: boolean;
  setIsInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Marcar que ya se hizo la primera carga
  const markAsRefetched = useCallback(() => {
    setShouldRefetch(false);
    setIsInitialized(true);
  }, []);

  // Invalidar cache cuando sea necesario (ej: nuevo post creado)
  const invalidateCache = useCallback(() => {
    console.log('🔄 PostsContext: Cache invalidado - se recargarán los posts');
    setShouldRefetch(true);
  }, []);

  const value = {
    posts,
    loading,
    error,
    setPosts,
    setLoading,
    setError,
    shouldRefetch,
    markAsRefetched,
    invalidateCache,
    isInitialized,
    setIsInitialized
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePostsContext debe usarse dentro de un PostsProvider');
  }
  return context;
};