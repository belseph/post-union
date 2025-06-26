package com.example.demo.postInteractions.model;

import com.example.demo.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.OffsetDateTime; // Importación clave
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnore
    private User user;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String contenido;

    @Column(name = "fecha_publicacion", nullable = false)
    private OffsetDateTime fechaPublicacion; // Cambiado a OffsetDateTime

    @Column(name = "ultima_actualizacion")
    private OffsetDateTime ultimaActualizacion; // Cambiado a OffsetDateTime

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "post_etiquetas",
            joinColumns = @JoinColumn(name = "id_post"),
            inverseJoinColumns = @JoinColumn(name = "id_etiqueta")
    )
    @JsonIgnore
    private Set<Tag> tags = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Comment> comments = new HashSet<>();

    // Constructor sin argumentos
    public Post() {
    }

    // Constructor con todos los argumentos (excepto colecciones)
    public Post(Long id, User user, String titulo, String contenido, OffsetDateTime fechaPublicacion, OffsetDateTime ultimaActualizacion) {
        this.id = id;
        this.user = user;
        this.titulo = titulo;
        this.contenido = contenido;
        this.fechaPublicacion = fechaPublicacion;
        this.ultimaActualizacion = ultimaActualizacion;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getContenido() {
        return contenido;
    }

    public OffsetDateTime getFechaPublicacion() {
        return fechaPublicacion;
    }

    public OffsetDateTime getUltimaActualizacion() {
        return ultimaActualizacion;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public void setFechaPublicacion(OffsetDateTime fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    public void setUltimaActualizacion(OffsetDateTime ultimaActualizacion) {
        this.ultimaActualizacion = ultimaActualizacion;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    // Métodos para manejar la relación con Tag
    public void addTag(Tag tag) {
        this.tags.add(tag);
        // Asegúrate de que el Set de posts en Tag no sea nulo antes de añadir
        if (tag.getPosts() == null) {
            tag.setPosts(new HashSet<>());
        }
        tag.getPosts().add(this);
    }

    public void removeTag(Tag tag) {
        this.tags.remove(tag);
        // Asegúrate de que el Set de posts en Tag no sea nulo antes de remover
        if (tag.getPosts() != null) {
            tag.getPosts().remove(this);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return Objects.equals(id, post.id) &&
                Objects.equals(titulo, post.titulo) &&
                Objects.equals(contenido, post.contenido) &&
                Objects.equals(fechaPublicacion, post.fechaPublicacion) &&
                Objects.equals(ultimaActualizacion, post.ultimaActualizacion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, titulo, contenido, fechaPublicacion, ultimaActualizacion);
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", contenido='" + contenido + '\'' +
                ", fechaPublicacion=" + fechaPublicacion +
                ", ultimaActualizacion=" + ultimaActualizacion +
                '}';
    }
}