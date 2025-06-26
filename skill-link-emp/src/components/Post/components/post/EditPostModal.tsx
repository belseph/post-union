import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import type { Post } from '../../types/post';
import { updatePost } from '../../hooks/api/postsApi';

interface EditPostModalProps {
  post: Post;
  currentUserId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ 
  post, 
  currentUserId, 
  onClose, 
  onSuccess 
}) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('El título y contenido son obligatorios');
      return;
    }

    if (title === post.title && content === post.content) {
      onClose();
      return;
    }

    setIsUpdating(true);
    try {
      await updatePost(post.id, title, content, currentUserId);
      console.log('Post editado exitosamente');
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error al editar post:', error);
      alert('Error al editar el post. Inténtalo de nuevo.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getCharacterCount = () => content.length;
  const maxCharacters = 2000;
  const maxTitleCharacters = 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Editar post</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            icon={X}
            className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full"
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-[calc(90vh-120px)]">
          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-6">
              <Avatar
                src={post.author.avatar}
                alt={post.author.name}
                size="lg"
              />
              <div>
                <h3 className="font-semibold text-slate-900">{post.author.name}</h3>
                <p className="text-sm text-slate-600">{post.author.title}</p>
              </div>
            </div>

            {/* Tags (solo mostrar, no editar) */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant={tag}>
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                Título del post
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Escribe un título llamativo para tu post..."
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-500 text-lg font-medium"
                maxLength={maxTitleCharacters}
                required
                disabled={isUpdating}
              />
              <div className="flex justify-end mt-1">
                <span className={`text-xs ${
                  title.length > maxTitleCharacters * 0.9 ? 'text-red-500' : 'text-slate-500'
                }`}>
                  {title.length}/{maxTitleCharacters}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-semibold text-slate-700 mb-2">
                Contenido
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="¿Qué quieres compartir?"
                className="w-full h-40 p-4 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-500"
                maxLength={maxCharacters}
                required
                disabled={isUpdating}
              />
              <div className="flex justify-end mt-2">
                <span className={`text-sm ${
                  getCharacterCount() > maxCharacters * 0.9 ? 'text-red-500' : 'text-slate-500'
                }`}>
                  {getCharacterCount()}/{maxCharacters}
                </span>
              </div>
            </div>

            {(title.trim() || content.trim()) && (
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Vista previa</h3>
                <div className="bg-white rounded-lg p-4 border border-slate-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar
                      src={post.author.avatar}
                      alt={post.author.name}
                      size="sm"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">{post.author.name}</h4>
                      <p className="text-xs text-slate-500">Ahora</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant={tag}>
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {title.trim() && (
                    <h2 className="text-lg font-bold text-slate-900 mb-2">
                      {title}
                    </h2>
                  )}
                  
                  <p className="text-sm text-slate-800 whitespace-pre-wrap">
                    {content || 'Tu contenido aparecerá aquí...'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                {(!title.trim() || !content.trim()) && (
                  <span className="text-red-500">
                    {!title.trim() ? 'Escribe un título' : 'Escribe contenido'}
                  </span>
                )}
                {title.trim() && content.trim() && (
                  <span className="text-green-600">
                    ✓ Listo para actualizar
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  disabled={isUpdating}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={!title.trim() || !content.trim() || isUpdating}
                  loading={isUpdating}
                  icon={Save}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isUpdating ? 'Guardando...' : 'Guardar cambios'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;