package com.example.demo.chat.model;

import com.example.demo.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "mensajes")
public class Mensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contenido;

    @Column(nullable = false)
    private boolean leido = false;

    private LocalDateTime timestampEnvio;

    @ManyToOne
    @JoinColumn(name = "emisor_id")
    @JsonIgnore
    private User emisor;

    @ManyToOne
    @JoinColumn(name = "conversacion_id")
    @JsonIgnore
    private Conversacion conversacion;

    // Getters y setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getContenido() { return contenido; }

    public void setContenido(String contenido) { this.contenido = contenido; }

    public LocalDateTime getTimestampEnvio() { return timestampEnvio; }

    public void setTimestampEnvio(LocalDateTime timestampEnvio) { this.timestampEnvio = timestampEnvio; }

    public User getEmisor() { return emisor; }

    public void setEmisor(User emisor) { this.emisor = emisor; }

    public Conversacion getConversacion() { return conversacion; }

    public void setConversacion(Conversacion conversacion) { this.conversacion = conversacion; }

    public boolean isLeido() {
        return leido;
    }

    public void setLeido(boolean leido) {
        this.leido = leido;
    }
}
