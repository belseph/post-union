import React, { useState, useRef, useEffect } from 'react';
import type { Comment } from '../../types/post';
import Avatar from '../ui/Avatar';
import ReactionButton from '../reaction/ReactionButton';
import Button from '../ui/Button';
import CommentForm from './CommentForm';
import { Reply, MoreHorizontal, Edit, Trash2, Save, X } from 'lucide-react';
import { updateComment, deleteComment } from '../../hooks/api/postsApi';

interface CommentCardProps {
  comment: Comment;
  isReply?: boolean;
  currentUserId?: string | null;
  onReaction?: (commentId: string, reactionType: string) => void;
  onNewComment?: (postId: string, content: string, parentCommentId?: string) => Promise<void>;
  forceRenderKey?: number;
  onEdit?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ 
  comment, 
  isReply = false,
  currentUserId,
  onReaction,
  onNewComment,
  forceRenderKey,
  onEdit,
  onDelete
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleReaction = (reactionType: string) => {
    console.log('Reacción a comentario:', comment.id, reactionType, 'forceRenderKey:', forceRenderKey);
    if (onReaction) {
      onReaction(comment.id, reactionType);
    } else {
      console.warn('No se proporcionó función onReaction para el comentario');
    }
  };

  const handleReplySubmit = async (content: string) => {
    if (onNewComment) {
      try {
        await onNewComment('1', content, comment.id);
        setShowReplyForm(false);
        setShowReplies(true);
        console.log('Respuesta enviada exitosamente');
      } catch (error) {
        console.error('Error al enviar respuesta:', error);
      }
    }
  };

  const handleEdit = () => {
    setShowMenu(false);
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim() || editContent === comment.content) {
      setIsEditing(false);
      return;
    }

    setIsUpdating(true);
    try {
      await updateComment(comment.id, editContent);
      setIsEditing(false);
      console.log('✅ Comentario editado exitosamente');
    } catch (error) {
      console.error('Error al editar comentario:', error);
      alert('Error al editar el comentario. Inténtalo de nuevo.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = () => {
    setShowMenu(false);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteComment(comment.id);
      setShowDeleteConfirm(false);
      console.log('Comentario eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      alert('Error al eliminar el comentario. Inténtalo de nuevo.');
    } finally {
      setIsDeleting(false);
    }
  };

  const isAuthor = currentUserId && comment.author.id === currentUserId;

  console.log(`Renderizando CommentCard ${comment.id}:`, {
    userReaction: comment.userReaction,
    reactions: comment.reactions,
    forceRenderKey,
    hasOnNewComment: !!onNewComment,
    isAuthor,
    currentUserId,
    authorId: comment.author.id,
    isEditing
  });

  return (
    <div className={`${isReply ? 'ml-8' : ''}`}>
      <div className="flex items-start space-x-3 group">
        <Avatar
          src={comment.author.avatar}
          alt={comment.author.name}
          size="sm"
        />
        
        <div className="flex-1 min-w-0">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-1">
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-white">{comment.author.name}</h4>
                <p className="text-sm text-white/80">{comment.author.title}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-white/80">{formatTimeAgo(comment.createdAt)}</span>
                
                {isAuthor && !isEditing && (
                  <div className="relative" ref={menuRef}>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={MoreHorizontal}
                      onClick={() => setShowMenu(!showMenu)}
                      className="text-white/70 hover:text-white/90 hover:bg-white/10 transition-all duration-200 p-1 rounded-full"
                    />

                    {showMenu && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                        <button
                          onClick={handleEdit}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                          <span className="text-sm font-medium">Editar comentario</span>
                        </button>
                        
                        <button
                          onClick={handleDelete}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Eliminar comentario</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 resize-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 min-h-[80px]"
                  placeholder="Edita tu comentario..."
                  disabled={isUpdating}
                />
                
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                    icon={X}
                    disabled={isUpdating}
                    className="text-white/70 hover:text-white/90 hover:bg-white/10"
                  >
                    Cancelar
                  </Button>
                  
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSaveEdit}
                    icon={Save}
                    loading={isUpdating}
                    disabled={!editContent.trim() || editContent === comment.content || isUpdating}
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    {isUpdating ? 'Guardando...' : 'Guardar'}
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-white leading-relaxed">{comment.content}</p>
            )}
          </div>

          {!isEditing && (
            <div className="flex items-center space-x-2 mt-2">
              <ReactionButton
                key={`reaction-${comment.id}-${forceRenderKey || 0}`}
                currentReaction={comment.userReaction || null}
                reactions={comment.reactions}
                onReaction={handleReaction}
              />
              
              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  icon={Reply}
                  className="text-white/70 hover:text-white/90 hover:bg-white/10 transition-colors font-medium px-2 py-1 rounded-lg"
                >
                  Responder
                </Button>
              )}
            </div>
          )}

          {showReplyForm && !isEditing && (
            <div className="mt-3">
              <CommentForm
                onSubmit={handleReplySubmit}
                placeholder={`Responder a ${comment.author.name}...`}
                parentCommentId={comment.id}
              />
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && !isEditing && (
            <div className="mt-3">
              {!showReplies ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplies(true)}
                  className="text-white/80 hover:text-white hover:bg-white/10 text-sm font-medium px-2 py-1 rounded-lg"
                >
                  Ver {comment.replies.length} respuesta{comment.replies.length > 1 ? 's' : ''}
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplies(false)}
                    className="text-white/70 hover:text-white/90 hover:bg-white/10 text-sm font-medium px-2 py-1 rounded-lg"
                  >
                    Ocultar respuestas
                  </Button>
                  {comment.replies.map((reply) => (
                    <CommentCard 
                      key={`${reply.id}-${forceRenderKey || 0}`}
                      comment={reply} 
                      isReply={true}
                      currentUserId={currentUserId}
                      onReaction={onReaction}
                      onNewComment={onNewComment}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      forceRenderKey={forceRenderKey}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">¿Eliminar comentario?</h3>
            <p className="text-slate-600 mb-6">Esta acción no se puede deshacer. El comentario se eliminará permanentemente.</p>
            
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="ghost"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="text-slate-600 hover:text-slate-800"
              >
                Cancelar
              </Button>
              
              <Button
                variant="danger"
                onClick={handleConfirmDelete}
                loading={isDeleting}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;