import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import EmojiPickerReact, { type EmojiClickData } from 'emoji-picker-react';
import { getUserAvatar } from '../../utils/avatarUtils';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  postId?: string;
  parentCommentId?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  onSubmit, 
  placeholder = "Escribe un comentario...",
}) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onSubmit(content);
        setContent('');
      } catch (error) {
        console.error('Error al enviar comentario:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setContent(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const currentUserAvatar = getUserAvatar('1');

  return (
    <div className="p-6 border-t border-white/20">
      <form onSubmit={handleSubmit} className="flex items-start space-x-3">
        <Avatar
          src={currentUserAvatar}
          alt="Tu avatar"
          size="md"
        />
        
        <div className="flex-1 relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-white/20 rounded-xl resize-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-200 placeholder-white/60 min-h-[80px] disabled:opacity-50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/15 hover:border-white/30 outline-none"
            style={{ outline: 'none' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          
          <div className="flex items-center justify-between mt-3">
            <div className="relative" ref={emojiPickerRef}>
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-white/60 hover:text-white/90 hover:bg-white/10 hover:scale-105 active:scale-95 cursor-pointer transition-all duration-200 p-2 rounded-lg outline-none border-none"
                style={{ outline: 'none', border: 'none' }}
                onFocus={(e) => e.target.blur()}
              >
                <Smile className="w-5 h-5" />
              </button>

              {showEmojiPicker && (
                <div className="absolute bottom-full left-0 mb-2 z-50 animate-in slide-in-from-bottom-2 duration-200">
                  <EmojiPickerReact
                    onEmojiClick={handleEmojiClick}
                    width={300}
                    height={400}
                    previewConfig={{
                      showPreview: false
                    }}
                    searchDisabled={false}
                    skinTonesDisabled={true}
                    lazyLoadEmojis={true}
                  />
                </div>
              )}
            </div>
            
            <Button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              icon={Send}
              size="sm"
              variant={content.trim() && !isSubmitting ? 'primary' : 'secondary'}
              loading={isSubmitting}
              className={`outline-none border-none ${content.trim() && !isSubmitting ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white/70'}`}
            >
              {isSubmitting ? 'Enviando...' : 'Comentar'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;