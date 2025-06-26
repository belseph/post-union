import React, { createContext, useContext, useState, useCallback } from 'react';

interface PostsContextType {
  shouldRefresh: boolean;
  invalidateCache: () => void;
  markAsRefreshed: () => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const invalidateCache = useCallback(() => {
    console.log('🔄 PostsContext: Invalidando cache de posts');
    setShouldRefresh(true);
  }, []);

  const markAsRefreshed = useCallback(() => {
    console.log('✅ PostsContext: Marcando como actualizado');
    setShouldRefresh(false);
  }, []);

  return (
    <PostsContext.Provider value={{ shouldRefresh, invalidateCache, markAsRefreshed }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePostsContext debe usarse dentro de PostsProvider');
  }
  return context;
};