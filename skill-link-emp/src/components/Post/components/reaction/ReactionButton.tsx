import React, { useState, useRef } from 'react';
import { Heart } from 'lucide-react';
import { reactionConfig } from '../../constants/reactions';
import Tooltip from '../ui/Tooltip';

interface ReactionButtonProps {
  currentReaction: string | null;
  reactions: Record<string, number>;
  onReaction: (reaction: string) => void;
}

const ReactionButton: React.FC<ReactionButtonProps> = ({ 
  currentReaction, 
  reactions,
  onReaction
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
      setHoveredReaction(null);
    }, 200);
  };

  const handleQuickReaction = () => {
    onReaction('Me gusta');
  };

  const currentReactionConfig = currentReaction ? reactionConfig[currentReaction as keyof typeof reactionConfig] : null;
  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className="relative">
      {isHovering && (
        <div 
          className="absolute bottom-full left-0 mb-2 bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-2 flex items-center space-x-1 z-50 animate-in slide-in-from-bottom-2 duration-200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {Object.entries(reactionConfig).map(([key, config]) => (
            <Tooltip key={key} content={config.label} position="top">
              <button
                onClick={() => onReaction(key)}
                onMouseEnter={() => setHoveredReaction(key)}
                onMouseLeave={() => setHoveredReaction(null)}
                className={`p-3 rounded-xl hover:bg-slate-100 transition-all duration-200 flex items-center justify-center min-w-[50px] min-h-[50px] cursor-pointer ${
                  hoveredReaction === key ? 'transform scale-125 bg-slate-100' : ''
                }`}
              >
                <span className="text-2xl select-none">{config.emoji}</span>
              </button>
            </Tooltip>
          ))}
        </div>
      )}

      <div className="flex items-center">
        <button
          onClick={handleQuickReaction}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 ${
            currentReaction
              ? `${currentReactionConfig?.color}`
              : 'text-white/70 hover:text-red-400'
          }`}
        >
          {currentReaction ? (
            <span className="text-lg select-none">{currentReactionConfig?.emoji}</span>
          ) : (
            <Heart className="w-5 h-5" />
          )}
        </button>
        {totalReactions > 0 && (
          <p className="text-white/70 ml-1">{totalReactions}</p>
        )}
      </div>
    </div>
  );
};

export default ReactionButton;