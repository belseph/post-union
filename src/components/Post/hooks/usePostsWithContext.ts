import { useEffect, useCallback } from 'react';
import type { Post, Comment, NotificationReaction } from '../types/post';

import { fetchPosts, fetchUserReaction, createComment } from './api/postsApi';
import { useWebSocket } from './websocket/useWebSocket';
import { useReactions } from './reactions/useReactions';
import { 
  parsePostDates, 
  updateCommentReactionsRecursive, 
  addCommentToPosts 
} from './utils/postUtils';

import { getUserAvatar } from '../utils/avatarUtils';
import { usePostsContext } from '../../../context/PostsContext';

interface UsePostsOptions {
  currentUserId: string | null;
}

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  handleReaction: (postId: string, reactionType: string) => Promise<void>;
  handleCommentReaction: (commentId: string, reactionType: string) => Promise<void>;
  handleNewComment: (postId: string, content: string, parentCommentId?: string) => Promise<void>;
}

export const usePostsWithContext = ({ currentUserId }: UsePostsOptions): UsePostsReturn => {
  const {
    posts,
    loading,
    error,
    setPosts,
    setLoading,
    setError,
    shouldRefetch,
    markAsRefetched,
    invalidateCache,
    isInitialized
  } = usePostsContext();

  const { handlePostReaction, handleCommentReaction } = useReactions({ currentUserId });

  // Función para asegurar que los usuarios tengan avatares
  const ensureUserHasAvatar = useCallback((user: any) => {
    if (!user.avatar || user.avatar === 'https://default-avatar.url/path') {
      return {
        ...user,
        avatar: getUserAvatar(user.id)
      };
    }
    return user;
  }, []);

  // Función para cargar posts (solo cuando sea necesario)
  const loadPosts = useCallback(async () => {
    // 🚀 OPTIMIZACIÓN: Solo cargar si es necesario
    if (!shouldRefetch && isInitialized) {
      console.log('📋 PostsContext: Usando posts del cache, no se hace petición');
      return;
    }

    console.log('🔄 PostsContext: Cargando posts desde el servidor...');
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchPosts(currentUserId);
      console.log('📡 Datos RAW del backend:', data);
      
      const normalizedPosts: Post[] = data.map(post => {
        const parsedPost = parsePostDates(post);
        
        parsedPost.author = ensureUserHasAvatar(parsedPost.author);
        const ensureCommentAvatars = (comments: Comment[]): Comment[] => {
          return comments.map(comment => ({
            ...comment,
            author: ensureUserHasAvatar(comment.author),
            replies: comment.replies ? ensureCommentAvatars(comment.replies) : []
          }));
        };
        
        parsedPost.comments = ensureCommentAvatars(parsedPost.comments);
        
        return parsedPost;
      });
      
      console.log('✅ Posts normalizados con avatares:', normalizedPosts);
      
      setPosts(normalizedPosts);
      markAsRefetched(); // Marcar como cargado
    } catch (err: any) {
      console.error("❌ Error fetching posts:", err);
      setError("No se pudieron cargar los posts. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  }, [currentUserId, ensureUserHasAvatar, shouldRefetch, isInitialized, setPosts, setLoading, setError, markAsRefetched]);

  const handleNewComment = useCallback(async (
    postId: string, 
    content: string, 
    parentCommentId?: string
  ) => {
    if (!currentUserId) {
      console.warn('No hay usuario logueado para crear comentario');
      throw new Error('Debes estar logueado para comentar');
    }

    try {
      console.log('💬 Creando comentario:', { postId, content, parentCommentId, currentUserId });
      
      const newCommentDTO = await createComment(content, postId, currentUserId, parentCommentId);
      
      console.log('✅ Comentario creado, DTO recibido:', newCommentDTO);
      
      const newComment: Comment = {
        id: newCommentDTO.id,
        author: ensureUserHasAvatar(newCommentDTO.author),
        content: newCommentDTO.content,
        createdAt: new Date(newCommentDTO.createdAt),
        reactions: newCommentDTO.reactions || {},
        userReaction: newCommentDTO.userReaction || null,
        replies: newCommentDTO.replies || []
      };

      setPosts(prevPosts => {
        return prevPosts.map(post => {
          if (post.id === postId) {
            if (parentCommentId) {
              const updateRepliesRecursive = (comments: Comment[]): Comment[] => {
                return comments.map(comment => {
                  if (comment.id === parentCommentId) {
                    return {
                      ...comment,
                      replies: [...(comment.replies || []), newComment]
                    };
                  } else if (comment.replies && comment.replies.length > 0) {
                    return {
                      ...comment,
                      replies: updateRepliesRecursive(comment.replies)
                    };
                  }
                  return comment;
                });
              };
              
              return {
                ...post,
                comments: updateRepliesRecursive(post.comments)
              };
            } else {
              return {
                ...post,
                comments: [...post.comments, newComment]
              };
            }
          }
          return post;
        });
      });

    } catch (error) {
      console.error('❌ Error al crear comentario:', error);
      throw error;
    }
  }, [currentUserId, ensureUserHasAvatar, setPosts]);

  const handleNewCommentFromWS = useCallback((newComment: Comment) => {
    console.log('📡 Nuevo comentario recibido vía WebSocket:', newComment);
    
    const commentWithAvatar = {
      ...newComment,
      author: ensureUserHasAvatar(newComment.author)
    };
    
    setPosts(prevPosts => addCommentToPosts(prevPosts, commentWithAvatar));
  }, [ensureUserHasAvatar, setPosts]);

  const handleCommentUpdateFromWS = useCallback((updatedComment: Comment) => {
    console.log('📡 Comentario actualizado recibido vía WebSocket:', updatedComment);
    
    const commentWithAvatar = {
      ...updatedComment,
      author: ensureUserHasAvatar(updatedComment.author)
    };
    
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        const updateCommentsRecursive = (comments: Comment[]): Comment[] => {
          return comments.map(comment => {
            if (comment.id === commentWithAvatar.id) {
              return commentWithAvatar;
            } else if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: updateCommentsRecursive(comment.replies)
              };
            }
            return comment;
          });
        };
        
        return {
          ...post,
          comments: updateCommentsRecursive(post.comments)
        };
      });
    });
  }, [ensureUserHasAvatar, setPosts]);

  const handleCommentDeleteFromWS = useCallback((deletedCommentId: string) => {
    console.log('📡 Comentario eliminado recibido vía WebSocket:', deletedCommentId);
    
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        const removeCommentsRecursive = (comments: Comment[]): Comment[] => {
          return comments
            .filter(comment => comment.id !== deletedCommentId)
            .map(comment => ({
              ...comment,
              replies: comment.replies ? removeCommentsRecursive(comment.replies) : []
            }));
        };
        
        return {
          ...post,
          comments: removeCommentsRecursive(post.comments)
        };
      });
    });
  }, [setPosts]);

  const handlePostUpdateFromWS = useCallback((updatedPost: Post) => {
    console.log('📡 Post actualizado recibido vía WebSocket:', updatedPost);
    
    const postWithAvatar = {
      ...updatedPost,
      author: ensureUserHasAvatar(updatedPost.author)
    };
    
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postWithAvatar.id) {
          return {
            ...postWithAvatar,
            comments: post.comments,
            reactions: post.reactions,
            userReaction: post.userReaction
          };
        }
        return post;
      });
    });
  }, [ensureUserHasAvatar, setPosts]);

  const handlePostDeleteFromWS = useCallback((deletedPostId: string) => {
    console.log('📡 Post eliminado recibido vía WebSocket:', deletedPostId);
    
    setPosts(prevPosts => {
      return prevPosts.filter(post => post.id !== deletedPostId);
    });
  }, [setPosts]);

  const handleReactionChange = useCallback(async (reactionNotification: NotificationReaction) => {
    console.log('📡 Procesando notificación de reacción:', reactionNotification);

    if (reactionNotification.targetType === 'POST') {
      let userReaction: string | null = null;
      
      if (currentUserId) {
        try {
          userReaction = await fetchUserReaction(currentUserId, reactionNotification.targetId, 'POST');
          console.log('👤 UserReaction de POST consultada:', userReaction);
        } catch (error) {
          console.error('❌ Error consultando userReaction de POST:', error);
        }
      }

      setPosts((prevPosts: Post[]) => {
        return prevPosts.map((post: Post) => {
          if (post.id === reactionNotification.targetId) {
            console.log('🔄 Actualizando reacciones del post:', post.id);
            
            return {
              ...post,
              reactions: { ...reactionNotification.reactionCounts },
              userReaction: userReaction
            };
          }
          return post;
        });
      });

    } else if (reactionNotification.targetType === 'COMMENT') {
      let userReaction: string | null = null;
      
      if (currentUserId) {
        try {
          userReaction = await fetchUserReaction(currentUserId, reactionNotification.targetId, 'COMMENT');
          console.log('💬 UserReaction de COMMENT consultada:', userReaction);
        } catch (error) {
          console.error('❌ Error consultando userReaction del comentario:', error);
        }
      }

      setPosts((prevPosts: Post[]) => {
        const timestamp = Date.now();
        console.log(`🔄 Forzando actualización de comentarios - Timestamp: ${timestamp}`);
        
        return prevPosts.map((post: Post) => {
          const updatedPost = {
            ...post,
            comments: updateCommentReactionsRecursive(
              post.comments,
              reactionNotification,
              userReaction
            ),
            _lastUpdate: timestamp
          };
          
          return updatedPost;
        });
      });
    }
  }, [currentUserId, setPosts]);

  // 🔌 WebSocket - Funciona independientemente del contexto
  useWebSocket({
    onNewComment: handleNewCommentFromWS,
    onReactionChange: handleReactionChange,
    onCommentUpdate: handleCommentUpdateFromWS,
    onCommentDelete: handleCommentDeleteFromWS,
    onPostUpdate: handlePostUpdateFromWS, 
    onPostDelete: handlePostDeleteFromWS  
  });

  // Cargar posts solo cuando sea necesario
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // 🎯 FUNCIÓN PARA INVALIDAR CACHE (cuando se crea un nuevo post)
  const forceRefetch = useCallback(() => {
    invalidateCache();
    loadPosts();
  }, [invalidateCache, loadPosts]);

  return { 
    posts, 
    loading, 
    error, 
    fetchPosts: forceRefetch, // Exponer función para forzar recarga
    handleReaction: handlePostReaction,
    handleCommentReaction,
    handleNewComment
  };
};