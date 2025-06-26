import type { Post, Comment, NotificationReaction } from '../types/post';

export const parsePostDates = (post: any): Post => ({
  ...post,
  createdAt: new Date(post.createdAt),
  comments: post.comments?.map((comment: any) => parseCommentDates(comment)) || [],
});

export const parseCommentDates = (comment: any): Comment => ({
  ...comment,
  createdAt: new Date(comment.createdAt),
  author: { ...comment.author, avatar: comment.author.avatar || 'https://default-avatar.url/path' },
  replies: comment.replies?.map((reply: any) => parseCommentDates(reply)) || [],
});

export const updateCommentReactionsRecursive = (
  comments: Comment[],
  notification: NotificationReaction
): Comment[] => {
  return comments.map(comment => {
    if (notification.targetType === 'COMMENT' && comment.id === notification.targetId) {
      return {
        ...comment,
        reactions: notification.reactionCounts,
        userReaction: notification.userReaction
      };
    }

    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: updateCommentReactionsRecursive(comment.replies, notification)
      };
    }

    return comment;
  });
};

export const addCommentToPosts = (
  prevPosts: Post[],
  newComment: Comment
): Post[] => {
  return prevPosts.map(post => {
    if (post.id === newComment.postId) {
      const updatedComments = [...post.comments];
      const addReplyRecursive = (comments: Comment[], reply: Comment): Comment[] => {
        return comments.map(c => {
          if (c.id === reply.parentCommentId) {
            const updatedReplies = c.replies ? [...c.replies] : [];
            if (!updatedReplies.some(r => r.id === reply.id)) {
              updatedReplies.push({
                ...reply,
                createdAt: new Date(reply.createdAt),
                author: { ...reply.author, avatar: reply.author.avatar || 'https://default-avatar.url/path' }
              });
            }
            return { ...c, replies: updatedReplies };
          } else if (c.replies && c.replies.length > 0) {
            return { ...c, replies: addReplyRecursive(c.replies, reply) };
          }
          return c;
        });
      };

      if (newComment.parentCommentId) {
        return { ...post, comments: addReplyRecursive(updatedComments, newComment) };
      } else {
        if (!updatedComments.some(c => c.id === newComment.id)) {
          updatedComments.push({
            ...newComment,
            createdAt: new Date(newComment.createdAt),
            author: { ...newComment.author, avatar: newComment.author.avatar || 'https://default-avatar.url/path' }
          });
        }
        return { ...post, comments: updatedComments };
      }
    }
    return post;
  });
};