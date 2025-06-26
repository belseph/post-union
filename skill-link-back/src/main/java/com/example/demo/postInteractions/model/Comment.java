package com.example.demo.postInteractions.model;

import com.example.demo.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "comentarios")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_post", nullable = false)
    @JsonIgnore
    private Post post;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String contenido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_comentario_padre")
    @JsonIgnore
    private Comment parentComment;

    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Comment> replies = new HashSet<>();

    @Column(name = "fecha_comentario", nullable = false)
    private OffsetDateTime fechaComentario; // Cambiado a OffsetDateTime

    @Column(name = "ultima_actualizacion")
    private OffsetDateTime ultimaActualizacion; // Cambiado a OffsetDateTime

    // Constructor sin argumentos
    public Comment() {
    }

    // Constructor con todos los argumentos (excepto colecciones que se inicializan en el campo)
    public Comment(Long id, User user, Post post, String contenido, Comment parentComment, OffsetDateTime fechaComentario, OffsetDateTime ultimaActualizacion) {
        this.id = id;
        this.user = user;
        this.post = post;
        this.contenido = contenido;
        this.parentComment = parentComment;
        this.fechaComentario = fechaComentario;
        this.ultimaActualizacion = ultimaActualizacion;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Post getPost() {
        return post;
    }

    public String getContenido() {
        return contenido;
    }

    public Comment getParentComment() {
        return parentComment;
    }

    public Set<Comment> getReplies() {
        return replies;
    }

    public OffsetDateTime getFechaComentario() {
        return fechaComentario;
    }

    public OffsetDateTime getUltimaActualizacion() {
        return ultimaActualizacion;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public void setParentComment(Comment parentComment) {
        this.parentComment = parentComment;
    }

    public void setReplies(Set<Comment> replies) {
        this.replies = replies;
    }

    public void setFechaComentario(OffsetDateTime fechaComentario) {
        this.fechaComentario = fechaComentario;
    }

    public void setUltimaActualizacion(OffsetDateTime ultimaActualizacion) {
        this.ultimaActualizacion = ultimaActualizacion;
    }

    // Métodos addReply y removeReply
    public void addReply(Comment reply) {
        this.replies.add(reply);
        reply.setParentComment(this);
    }

    public void removeReply(Comment reply) {
        this.replies.remove(reply);
        reply.setParentComment(null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return Objects.equals(id, comment.id) &&
                Objects.equals(contenido, comment.contenido) &&
                Objects.equals(fechaComentario, comment.fechaComentario) &&
                Objects.equals(ultimaActualizacion, comment.ultimaActualizacion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, contenido, fechaComentario, ultimaActualizacion);
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", contenido='" + contenido + '\'' +
                ", fechaComentario=" + fechaComentario +
                ", ultimaActualizacion=" + ultimaActualizacion +
                '}';
    }
}