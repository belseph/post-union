import React, { useState } from 'react';
import { MessageCircle, Share2, Bookmark } from 'lucide-react';
import ReactionButton from '../reaction/ReactionButton';
import Button from '../ui/Button';

interface PostActionsProps {
  reactions: Record<string, number>;
  userReaction: string | null;
  onReaction: (reaction: string) => void;
  onToggleComments: () => void;
  showComments: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({
  reactions,
  userReaction,
  onReaction,
  onToggleComments,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="flex items-center justify-between pt-5">
      <div className="flex items-center space-x-2">
        <ReactionButton
          currentReaction={userReaction}
          reactions={reactions}
          onReaction={onReaction}
        />
        
        <button
          onClick={onToggleComments}
          className="flex items-center space-x-2 text-white/70 hover:text-white/90 hover:bg-white/10 hover:scale-105 active:scale-95 cursor-pointer transition-all duration-200 px-3 py-2 rounded-lg outline-none border-none"
          style={{ outline: 'none', border: 'none' }}
          onFocus={(e) => e.target.blur()}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Comentar</span>
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          icon={Share2}
          className="text-white/70 hover:text-white/90 hover:bg-white/10 hover:scale-105 active:scale-95 cursor-pointer transition-all duration-200 p-2 rounded-lg outline-none border-none"
        />
        <Button
          variant="ghost"
          size="sm"
          icon={Bookmark}
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-2 hover:scale-105 active:scale-95 cursor-pointer transition-all duration-200 rounded-lg outline-none border-none ${
            isBookmarked 
              ? 'text-blue-300 bg-blue-500/20 hover:bg-blue-500/30' 
              : 'text-white/70 hover:text-white/90 hover:bg-white/10'
          }`}
        />
      </div>
    </div>
  );
};

export default PostActions;