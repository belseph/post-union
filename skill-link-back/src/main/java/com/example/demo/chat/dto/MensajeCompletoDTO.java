package com.example.demo.chat.dto;

public class MensajeCompletoDTO {
    private Long id;
    private String contenido;
    private boolean leido;
    private String timestampEnvio;
    private EmisorCompletoDTO emisor;

    public MensajeCompletoDTO() {}

    public MensajeCompletoDTO(Long id, String contenido, boolean leido, String timestampEnvio, EmisorCompletoDTO emisor) {
        this.id = id;
        this.contenido = contenido;
        this.leido = leido;
        this.timestampEnvio = timestampEnvio;
        this.emisor = emisor;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }

    public boolean isLeido() { return leido; }
    public void setLeido(boolean leido) { this.leido = leido; }

    public String getTimestampEnvio() { return timestampEnvio; }
    public void setTimestampEnvio(String timestampEnvio) { this.timestampEnvio = timestampEnvio; }

    public EmisorCompletoDTO getEmisor() { return emisor; }
    public void setEmisor(EmisorCompletoDTO emisor) { this.emisor = emisor; }
}