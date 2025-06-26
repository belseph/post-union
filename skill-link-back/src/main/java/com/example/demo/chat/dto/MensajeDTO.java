package com.example.demo.chat.dto;

import java.time.LocalDateTime;

public class MensajeDTO {
    private Long id;
    private String contenido;
    private boolean leido;
    private LocalDateTime timestampEnvio;
    private Long emisorId;
    private String emisorNombre;
    private String emisorEmail;

    public MensajeDTO() {}

    public MensajeDTO(Long id, String contenido, boolean leido, LocalDateTime timestampEnvio,
                      Long emisorId, String emisorNombre, String emisorEmail) {
        this.id = id;
        this.contenido = contenido;
        this.leido = leido;
        this.timestampEnvio = timestampEnvio;
        this.emisorId = emisorId;
        this.emisorNombre = emisorNombre;
        this.emisorEmail = emisorEmail;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }

    public boolean isLeido() { return leido; }
    public void setLeido(boolean leido) { this.leido = leido; }

    public LocalDateTime getTimestampEnvio() { return timestampEnvio; }
    public void setTimestampEnvio(LocalDateTime timestampEnvio) { this.timestampEnvio = timestampEnvio; }

    public Long getEmisorId() { return emisorId; }
    public void setEmisorId(Long emisorId) { this.emisorId = emisorId; }

    public String getEmisorNombre() { return emisorNombre; }
    public void setEmisorNombre(String emisorNombre) { this.emisorNombre = emisorNombre; }

    public String getEmisorEmail() { return emisorEmail; }
    public void setEmisorEmail(String emisorEmail) { this.emisorEmail = emisorEmail; }
}