package com.example.demo.postInteractions.model;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "tipo_reaccion")
public class ReactionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombreReaccion; // Ej. "Me gusta", "Me encanta", "Interesante"

    public ReactionType() {
    }

    public ReactionType(Long id, String nombreReaccion) {
        this.id = id;
        this.nombreReaccion = nombreReaccion;
    }

    public Long getId() {
        return id;
    }

    public String getNombreReaccion() {
        return nombreReaccion;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombreReaccion(String nombreReaccion) {
        this.nombreReaccion = nombreReaccion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReactionType that = (ReactionType) o;
        return Objects.equals(id, that.id) && Objects.equals(nombreReaccion, that.nombreReaccion);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombreReaccion);
    }

    @Override
    public String toString() {
        return "ReactionType{" +
                "id=" + id +
                ", nombreReaccion='" + nombreReaccion + '\'' +
                '}';
    }
}