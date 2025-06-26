package com.example.demo.postInteractions.dto;

import com.example.demo.postInteractions.model.Comment;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.OffsetDateTime; // Importación para OffsetDateTime
import java.util.List;
import java.util.Map;

public class CommentDTO {
    private String id;
    private UserDTO author;
    private String content;
    private OffsetDateTime createdAt; // Convertido a OffsetDateTime

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Map<String, Integer> reactions;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String userReaction;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String parentCommentId;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<CommentDTO> replies;

    // Constructor sin argumentos (reemplaza @NoArgsConstructor de Lombok)
    public CommentDTO() {
    }

    // Constructor con todos los argumentos (reemplaza @AllArgsConstructor de Lombok)
    public CommentDTO(String id, UserDTO author, String content, OffsetDateTime createdAt, Map<String, Integer> reactions, String userReaction, String parentCommentId, List<CommentDTO> replies) {
        this.id = id;
        this.author = author;
        this.content = content;
        this.createdAt = createdAt;
        this.reactions = reactions;
        this.userReaction = userReaction;
        this.parentCommentId = parentCommentId;
        this.replies = replies;
    }

    // Constructor que toma un objeto Comment (este ya lo tenías)
    public CommentDTO(Comment comment) {
        if (comment != null) {
            this.id = comment.getId() != null ? comment.getId().toString() : null;
            this.author = new UserDTO(comment.getUser());
            this.content = comment.getContenido();
            this.createdAt = comment.getFechaComentario();
            this.parentCommentId = comment.getParentComment() != null ? comment.getParentComment().getId().toString() : null;
        }
    }

    // Getters (reemplazan @Data de Lombok)
    public String getId() {
        return id;
    }

    public UserDTO getAuthor() {
        return author;
    }

    public String getContent() {
        return content;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public Map<String, Integer> getReactions() {
        return reactions;
    }

    public String getUserReaction() {
        return userReaction;
    }

    public String getParentCommentId() {
        return parentCommentId;
    }

    public List<CommentDTO> getReplies() {
        return replies;
    }

    // Setters (reemplazan @Data de Lombok)
    public void setId(String id) {
        this.id = id;
    }

    public void setAuthor(UserDTO author) {
        this.author = author;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setReactions(Map<String, Integer> reactions) {
        this.reactions = reactions;
    }

    public void setUserReaction(String userReaction) {
        this.userReaction = userReaction;
    }

    public void setParentCommentId(String parentCommentId) {
        this.parentCommentId = parentCommentId;
    }

    public void setReplies(List<CommentDTO> replies) {
        this.replies = replies;
    }
}