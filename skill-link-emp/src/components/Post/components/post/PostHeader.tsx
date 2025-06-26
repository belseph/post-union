import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import type { User } from '../../types/post';
import { deletePost } from '../../hooks/api/postsApi';

interface PostHeaderProps {
  author: User;
  tags: string[];
  createdAt: Date;
  postId: string;
  currentUserId?: string | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ 
  author, 
  tags, 
  createdAt,
  postId,
  currentUserId,
  onEdit, 
  onDelete 
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const formatTimeAgo = (date: Date | string | number) => {
    try {
      let dateObj: Date;
      
      if (date instanceof Date) {
        dateObj = date;
      } else {
        dateObj = new Date(date);
      }
      
      if (isNaN(dateObj.getTime())) {
        console.warn('Fecha inválida en PostHeader:', date);
        return 'Fecha inválida';
      }
      
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return 'Hace unos minutos';
      if (diffInHours < 24) return `Hace ${diffInHours}h`;
      return `Hace ${Math.floor(diffInHours / 24)}d`;
    } catch (error) {
      console.error('Error al formatear fecha en PostHeader:', error, 'Fecha recibida:', date);
      return 'Fecha inválida';
    }
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

  const handleEdit = () => {
    setShowMenu(false);
    if (onEdit) {
      onEdit();
    } else {
      console.log('Editar post');
    }
  };

  const handleDelete = () => {
    setShowMenu(false);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePost(postId);
      setShowDeleteConfirm(false);
      console.log('Post eliminado exitosamente');
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Error al eliminar post:', error);
      alert('Error al eliminar el post. Inténtalo de nuevo.');
    } finally {
      setIsDeleting(false);
    }
  };

  const isAuthor = currentUserId && author.id === currentUserId;

  console.log('PostHeader - createdAt:', {
    value: createdAt,
    type: typeof createdAt,
    isDate: createdAt instanceof Date,
    isValid: createdAt instanceof Date ? !isNaN(createdAt.getTime()) : 'N/A'
  });

  return (
    <>
      <div className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar
              src={author.avatar}
              alt={author.name}
              size="lg"
            />
            <div>
              <h3 className="font-semibold text-white flex items-center space-x-1">
                <span>{author.name}</span>
              </h3>
              <p className="text-sm text-white/80">{author.title}</p>
              <p className="text-xs text-white/80">{formatTimeAgo(createdAt)}</p>
            </div>
          </div>
          
          {isAuthor && (
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="text-white/60 hover:text-white/80 transition-colors p-2 hover:bg-white/10 rounded-full cursor-pointer"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm font-medium">Editar post</span>
                  </button>
                  
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Eliminar post</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant={tag}>
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">¿Eliminar post?</h3>
            <p className="text-slate-600 mb-6">
              Esta acción no se puede deshacer. El post y todos sus comentarios se eliminarán permanentemente.
            </p>
            
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
    </>
  );
};

export default PostHeader;