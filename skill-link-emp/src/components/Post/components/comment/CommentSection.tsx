import React from 'react';
import type { Comment } from '../../types/post';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
  currentUserId?: string | null;
  onCommentReaction?: (commentId: string, reactionType: string) => void;
  onNewComment?: (postId: string, content: string, parentCommentId?: string) => Promise<void>;
  forceRenderKey?: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  comments, 
  postId,
  currentUserId,
  onCommentReaction,
  onNewComment,
  forceRenderKey
}) => {

  const handleNewComment = async (content: string) => {
    if (onNewComment) {
      try {
        await onNewComment(postId, content);
        console.log('Comentario enviado exitosamente');
      } catch (error) {
        console.error('Error al enviar comentario:', error);
      }
    } else {
      console.warn('No se proporcionó función onNewComment');
    }
  };

  const handleEditComment = (commentId: string) => {
    console.log('Editar comentario:', commentId);
  };

  const handleDeleteComment = (commentId: string) => {
    console.log('Eliminar comentario:', commentId);
  };

  console.log(`🔄 Renderizando CommentSection para post ${postId}:`, {
    commentsCount: comments.length,
    forceRenderKey,
    hasOnNewComment: !!onNewComment,
    currentUserId
  });

  return (
    <div className="border-t border-white/20 bg-white/5 backdrop-blur-sm rounded-b-xl hover:bg-white/2 transition-all duration-300">
      {comments.length > 0 && (
        <div className="px-6 py-4 space-y-4">
          {comments.map((comment) => (
            <CommentCard 
              key={`${comment.id}-${forceRenderKey || 0}`}
              comment={comment}
              currentUserId={currentUserId}
              onReaction={onCommentReaction}
              onNewComment={onNewComment}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
              forceRenderKey={forceRenderKey}
            />
          ))}
        </div>
      )}

      <CommentForm 
        onSubmit={handleNewComment} 
        postId={postId}
        placeholder="Escribe un comentario..."
      />
    </div>
  );
};

export default CommentSection;