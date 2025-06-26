package com.example.demo.postInteractions.controller;

import com.example.demo.postInteractions.dto.CommentDTO;
import com.example.demo.postInteractions.dto.PostDTO;
import com.example.demo.postInteractions.dto.ReactionNotificationDTO;
import com.example.demo.postInteractions.model.TargetType;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@Controller
public class WebSocketMessageController {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public WebSocketMessageController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Notifica a los suscriptores sobre un nuevo comentario.
     */
    public void notifyNewComment(CommentDTO commentDTO) {
        String destination = "/topic/comments/new";
        messagingTemplate.convertAndSend(destination, commentDTO);
    }

    /**
     * Notifica sobre la actualización de un comentario
     */
    public void notifyCommentUpdate(CommentDTO commentDTO) {
        String destination = "/topic/comments/updated";
        messagingTemplate.convertAndSend(destination, commentDTO);
    }

    /**
     *  Notifica sobre la eliminación de un comentario
     */
    public void notifyCommentDelete(Long commentId) {
        String destination = "/topic/comments/deleted";
        messagingTemplate.convertAndSend(destination, commentId.toString());
    }

    /**
     *  Notifica sobre la actualización de un post
     */
    public void notifyPostUpdate(PostDTO postDTO) {
        String destination = "/topic/posts/updated";
        messagingTemplate.convertAndSend(destination, postDTO);
    }

    /**
     * Notifica sobre la eliminación de un post
     */
    public void notifyPostDelete(Long postId) {
        String destination = "/topic/posts/deleted";
        messagingTemplate.convertAndSend(destination, postId.toString());
    }

    /**
     * Notifica a los suscriptores sobre un cambio en las reacciones de un post o comentario.
     */
    public void notifyReactionChange(Long targetId, TargetType targetType, Map<String, Long> reactionCounts) {
        String destination = "/topic/reactions/new";

        ReactionNotificationDTO notification = new ReactionNotificationDTO(
                String.valueOf(targetId),
                targetType,
                reactionCounts,
                null
        );

        messagingTemplate.convertAndSend(destination, notification);
    }
}