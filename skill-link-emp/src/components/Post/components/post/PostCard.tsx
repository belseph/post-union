import React, { useState } from 'react';
import type { Post } from '../../types/post';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import ReactionStats from '../reaction/ReactionStats';
import CommentSection from '../comment/CommentSection';
import EditPostModal from './EditPostModal';
import { getPostImage } from '../../utils/imageUtils';

interface PostCardProps {
  post: Post;
  currentUserId?: string | null;
  onReaction: (postId: string, reactionType: string) => void;
  onCommentReaction?: (commentId: string, reactionType: string) => void;
  onNewComment?: (postId: string, content: string, parentCommentId?: string) => Promise<void>;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post,
  currentUserId,
  onReaction, 
  onCommentReaction,
  onNewComment
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleReaction = (reactionType: string) => {
    onReaction(post.id, reactionType);
  };

  const handleEditPost = () => {
    console.log('Editar post:', post.id);
    setShowEditModal(true);
  };

  const handleDeletePost = () => {
    console.log('Post eliminado:', post.id);
  };

  const handleEditSuccess = () => {
    console.log('Post editado exitosamente');
  };

  console.log(`🔄 Renderizando PostCard ${post.id}:`, {
    userReaction: post.userReaction,
    reactions: post.reactions,
    _lastUpdate: post._lastUpdate,
    hasOnNewComment: !!onNewComment,
    currentUserId,
    authorId: post.author.id
  });

  return (
    <>
      <article className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden shadow-lg">
        <PostHeader
          author={post.author}
          tags={post.tags}
          createdAt={post.createdAt}
          postId={post.id}
          currentUserId={currentUserId}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
        />

        <PostContent 
          title={post.title}
          content={post.content} 
          image={getPostImage(post.id)}
        />

        <ReactionStats
          reactions={post.reactions}
          commentsCount={post.comments.length}
        />

        <PostActions
          reactions={post.reactions}
          userReaction={post.userReaction}
          onReaction={handleReaction}
          onToggleComments={() => setShowComments(!showComments)}
          showComments={showComments}
        />

        {showComments && (
          <CommentSection 
            comments={post.comments} 
            postId={post.id}
            currentUserId={currentUserId}
            onCommentReaction={onCommentReaction}
            onNewComment={onNewComment}
            forceRenderKey={post._lastUpdate}
          />
        )}
      </article>

      {showEditModal && currentUserId && (
        <EditPostModal
          post={post}
          currentUserId={currentUserId}
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
};

export default PostCard;