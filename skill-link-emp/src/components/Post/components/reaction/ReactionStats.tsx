import React from 'react';
import { reactionConfig } from '../../constants/reactions';

interface ReactionStatsProps {
  reactions: Record<string, number>;
  commentsCount?: number;
}

const ReactionStats: React.FC<ReactionStatsProps> = ({ reactions, commentsCount = 0 }) => {
  const getTotalReactions = () => {
    return Object.values(reactions).reduce((sum, count) => sum + count, 0);
  };

  const totalReactions = getTotalReactions();

  if (totalReactions === 0 && commentsCount === 0) return null;

  return (
    <div className="py-2 border-t border-white/20">
      <div className="flex items-center justify-between text-sm text-white">
        {totalReactions > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              {Object.entries(reactions)
                .filter(([_, count]) => count > 0)
                .slice(0, 3)
                .map(([reaction]) => (
                  <div key={reaction} className="w-5 h-5 flex items-center justify-center text-sm bg-white/20 rounded-full border border-white/30">
                    {reactionConfig[reaction as keyof typeof reactionConfig]?.emoji}
                  </div>
                ))}
            </div>
            <span className="text-white font-medium">{totalReactions} reacciones</span>
          </div>
        )}
        
        {commentsCount > 0 && (
          <div className="flex items-center space-x-4">
            <span className="text-white font-medium">{commentsCount} comentarios</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactionStats;