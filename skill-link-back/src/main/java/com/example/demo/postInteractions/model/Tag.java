package com.example.demo.postInteractions.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "etiquetas")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombreEtiqueta;

    @ManyToMany(mappedBy = "tags")
    private Set<Post> posts = new HashSet<>();

    public Tag() {
    }

    public Tag(Long id, String nombreEtiqueta) {
        this.id = id;
        this.nombreEtiqueta = nombreEtiqueta;
    }

    public Long getId() {
        return id;
    }

    public String getNombreEtiqueta() {
        return nombreEtiqueta;
    }

    public Set<Post> getPosts() {
        return posts;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombreEtiqueta(String nombreEtiqueta) {
        this.nombreEtiqueta = nombreEtiqueta;
    }

    public void setPosts(Set<Post> posts) {
        this.posts = posts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tag tag = (Tag) o;
        return Objects.equals(id, tag.id) && Objects.equals(nombreEtiqueta, tag.nombreEtiqueta);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombreEtiqueta);
    }

    @Override
    public String toString() {
        return "Tag{" +
                "id=" + id +
                ", nombreEtiqueta='" + nombreEtiqueta + '\'' +
                '}';
    }
}