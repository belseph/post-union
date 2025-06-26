import type { Post, Comment, NotificationReaction } from '../../types/post';

const parseDate = (dateValue: any): Date => {
  if (!dateValue) {
    return new Date();
  }
  
  if (dateValue instanceof Date) {
    return dateValue;
  }
  
  if (typeof dateValue === 'string' || typeof dateValue === 'number') {
    const parsed = new Date(dateValue);
    if (isNaN(parsed.getTime())) {
      console.warn('Fecha inválida recibida:', dateValue, 'usando fecha actual');
      return new Date();
    }
    return parsed;
  }
  
  console.warn('Tipo de fecha desconocido:', typeof dateValue, dateValue, 'usando fecha actual');
  return new Date();
};

export const parsePostDates = (post: any): Post => {
  return {
    ...post,
    createdAt: parseDate(post.createdAt),
    reactions: post.reactions || {},
    userReaction: post.userReaction || null,
    comments: post.comments?.map((comment: any) => parseCommentDates(comment)) || []
  };
};

export const parseCommentDates = (comment: any): Comment => {
  return {
    ...comment,
    createdAt: parseDate(comment.createdAt),
    reactions: comment.reactions || {},
    userReaction: comment.userReaction || null,
    replies: comment.replies?.map((reply: any) => parseCommentDates(reply)) || []
  };
};

export const updateCommentReactionsRecursive = (
  comments: Comment[], 
  reactionNotification: NotificationReaction,
  userReaction?: string | null
): Comment[] => {
  return comments.map(comment => {
    if (comment.id === reactionNotification.targetId && reactionNotification.targetType === 'COMMENT') {
      console.log(`🔄 Actualizando comentario ${comment.id}:`, {
        conteoAntes: comment.reactions,
        conteoDespues: reactionNotification.reactionCounts,
        userReactionAntes: comment.userReaction,
        userReactionDespues: userReaction !== undefined ? userReaction : comment.userReaction
      });
      
      const updatedComment = {
        ...comment,
        reactions: { ...reactionNotification.reactionCounts },
        userReaction: userReaction !== undefined ? userReaction : comment.userReaction,
        replies: comment.replies ? [...comment.replies] : []
      };
      
      console.log('✅ Comentario actualizado:', updatedComment);
      return updatedComment;
    }
    
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: updateCommentReactionsRecursive(comment.replies, reactionNotification, userReaction)
      };
    }
    
    return comment;
  });
};

export const addCommentToPosts = (posts: Post[], newComment: Comment): Post[] => {
  return posts.map(post => {
    if ((newComment as any).postId === post.id) {
      const commentWithParsedDate = {
        ...newComment,
        createdAt: parseDate(newComment.createdAt)
      };
      
      return {
        ...post,
        comments: [...post.comments, commentWithParsedDate]
      };
    }
    return post;
  });
};