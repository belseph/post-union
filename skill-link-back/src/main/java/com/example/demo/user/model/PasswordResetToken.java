package com.example.demo.user.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 255)
    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User usuario;

    @Column(nullable = false)
    private OffsetDateTime fechaCreacion;

    @Column(nullable = false)
    private OffsetDateTime fechaExpiracion;

    @Column(nullable = false)
    private boolean usado = false;

    // Constructores
    public PasswordResetToken() {}

    public PasswordResetToken(String token, User usuario, OffsetDateTime fechaCreacion, OffsetDateTime fechaExpiracion) {
        this.token = token;
        this.usuario = usuario;
        this.fechaCreacion = fechaCreacion;
        this.fechaExpiracion = fechaExpiracion;
        this.usado = false;
    }

    // Métodos de utilidad
    public boolean isExpirado() {
        return OffsetDateTime.now(ZoneOffset.UTC).isAfter(this.fechaExpiracion);
    }

    public boolean isValido() {
        return !usado && !isExpirado();
    }

    public void marcarComoUsado() {
        this.usado = true;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUsuario() {
        return usuario;
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }

    public OffsetDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(OffsetDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public OffsetDateTime getFechaExpiracion() {
        return fechaExpiracion;
    }

    public void setFechaExpiracion(OffsetDateTime fechaExpiracion) {
        this.fechaExpiracion = fechaExpiracion;
    }

    public boolean isUsado() {
        return usado;
    }

    public void setUsado(boolean usado) {
        this.usado = usado;
    }
}