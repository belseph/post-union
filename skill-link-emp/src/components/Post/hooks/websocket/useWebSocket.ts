import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import type { Comment, NotificationReaction, Post } from '../../types/post';

interface UseWebSocketOptions {
  onNewComment: (comment: Comment) => void;
  onReactionChange: (notification: NotificationReaction) => void;
  onCommentUpdate?: (comment: Comment) => void;
  onCommentDelete?: (commentId: string) => void;
  onPostUpdate?: (post: Post) => void;
  onPostDelete?: (postId: string) => void;
}

export const useWebSocket = ({ 
  onNewComment, 
  onReactionChange, 
  onCommentUpdate, 
  onCommentDelete,
  onPostUpdate,
  onPostDelete
}: UseWebSocketOptions) => {
  const clientRef = useRef<Client | null>(null);

  const parseDate = (dateValue: any): Date => {
    if (!dateValue) return new Date();
    if (dateValue instanceof Date) return dateValue;
    
    const parsed = new Date(dateValue);
    if (isNaN(parsed.getTime())) {
      console.warn('Fecha inválida en WebSocket:', dateValue);
      return new Date();
    }
    return parsed;
  };

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new WebSocket('wss://skill-link-emprendedor-pjof.onrender.com/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log('WebSocket Conectado!');

        client.subscribe('/topic/comments/new', message => {
          console.log('Nueva notificación de comentario RAW:', message.body);
          try {
            const newComment: Comment = JSON.parse(message.body);
            newComment.createdAt = parseDate(newComment.createdAt);
            onNewComment(newComment);
          } catch (e) {
            console.error('Error parseando notificación de comentario:', e, message.body);
          }
        });

        // Suscripción a comentarios editados
        if (onCommentUpdate) {
          client.subscribe('/topic/comments/updated', message => {
            console.log('Comentario actualizado RAW:', message.body);
            try {
              const updatedComment: Comment = JSON.parse(message.body);
              updatedComment.createdAt = parseDate(updatedComment.createdAt);
              onCommentUpdate(updatedComment);
            } catch (e) {
              console.error('Error parseando comentario actualizado:', e, message.body);
            }
          });
        }

        // Suscripción a comentarios eliminados
        if (onCommentDelete) {
          client.subscribe('/topic/comments/deleted', message => {
            console.log('Comentario eliminado RAW:', message.body);
            try {
              const deletedCommentId: string = message.body.replace(/"/g, '');
              onCommentDelete(deletedCommentId);
            } catch (e) {
              console.error('Error parseando comentario eliminado:', e, message.body);
            }
          });
        }

        // Suscripción a posts editados
        if (onPostUpdate) {
          client.subscribe('/topic/posts/updated', message => {
            console.log('Post actualizado RAW:', message.body);
            try {
              const updatedPost: Post = JSON.parse(message.body);
              updatedPost.createdAt = parseDate(updatedPost.createdAt);
              onPostUpdate(updatedPost);
            } catch (e) {
              console.error('Error parseando post actualizado:', e, message.body);
            }
          });
        }

        // Suscripción a posts eliminados
        if (onPostDelete) {
          client.subscribe('/topic/posts/deleted', message => {
            console.log('Post eliminado RAW:', message.body);
            try {
              const deletedPostId: string = message.body.replace(/"/g, '');
              onPostDelete(deletedPostId);
            } catch (e) {
              console.error('Error parseando post eliminado:', e, message.body);
            }
          });
        }

        // Suscripción a reacciones
        client.subscribe('/topic/reactions/new', message => {
          console.log('Nueva notificación de reacción RAW:', message.body);
          try {
            const reactionNotification: NotificationReaction = JSON.parse(message.body);
            console.log('Notificación de reacción PARSEADA:', reactionNotification);
            onReactionChange(reactionNotification);
          } catch (e) {
            console.error('ERROR al procesar notificación de reacción del WebSocket:', e, 'Mensaje recibido:', message.body);
          }
        });
      },

      onStompError: (frame) => {
        console.error('Error STOMP:', frame);
      },
      onDisconnect: () => {
        console.log('WebSocket Desconectado.');
      },
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (client.connected) {
        client.deactivate();
        console.log('Desactivando conexión WebSocket.');
      }
    };
  }, [onNewComment, onReactionChange, onCommentUpdate, onCommentDelete, onPostUpdate, onPostDelete]);

  return clientRef.current;
};