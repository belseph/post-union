package com.example.demo.postInteractions.dto;

import com.example.demo.postInteractions.model.Post;
import com.example.demo.postInteractions.model.Tag;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public class PostDTO {
    private String id;
    private UserDTO author;
    private String title;
    private String content;
    private List<String> tags;
    private OffsetDateTime createdAt;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Map<String, Integer> reactions;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String userReaction;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<CommentDTO> comments;

    public PostDTO() {
    }

    public PostDTO(String id, UserDTO author, String title, String content, List<String> tags, OffsetDateTime createdAt, Map<String, Integer> reactions, String userReaction, List<CommentDTO> comments) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.createdAt = createdAt;
        this.reactions = reactions;
        this.userReaction = userReaction;
        this.comments = comments;
    }

    public PostDTO(Post post) {
        if (post != null) {
            this.id = post.getId() != null ? post.getId().toString() : null;
            this.author = new UserDTO(post.getUser());
            this.title = post.getTitulo();
            this.content = post.getContenido();
            this.createdAt = post.getFechaPublicacion();

            if (post.getTags() != null && !post.getTags().isEmpty()) {
                this.tags = post.getTags().stream()
                        .map(Tag::getNombreEtiqueta)
                        .collect(Collectors.toList());
            } else {
                this.tags = List.of();
            }
        }
    }

    public String getId() {
        return id;
    }

    public UserDTO getAuthor() {
        return author;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public List<String> getTags() {
        return tags;
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

    public List<CommentDTO> getComments() {
        return comments;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setAuthor(UserDTO author) {
        this.author = author;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
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

    public void setComments(List<CommentDTO> comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "PostDTO{" +
                "id='" + id + '\'' +
                ", author=" + author +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", tags=" + tags +
                ", createdAt=" + createdAt +
                ", reactions=" + reactions +
                ", userReaction='" + userReaction + '\'' +
                ", comments=" + comments +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PostDTO postDTO = (PostDTO) o;
        return Objects.equals(id, postDTO.id) &&
                Objects.equals(author, postDTO.author) &&
                Objects.equals(title, postDTO.title) &&
                Objects.equals(content, postDTO.content) &&
                Objects.equals(tags, postDTO.tags) &&
                Objects.equals(createdAt, postDTO.createdAt) &&
                Objects.equals(reactions, postDTO.reactions) &&
                Objects.equals(userReaction, postDTO.userReaction) &&
                Objects.equals(comments, postDTO.comments);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, author, title, content, tags, createdAt, reactions, userReaction, comments);
    }
}