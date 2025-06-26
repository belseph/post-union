package com.example.demo.chat.dto;

public class EnviarMensajeRequest {
    private Long idConversacion;
    private Long idEmisor;
    private String contenido;

    // Getters y Setters
    public Long getIdConversacion() {
        return idConversacion;
    }

    public void setIdConversacion(Long idConversacion) {
        this.idConversacion = idConversacion;
    }

    public Long getIdEmisor() {
        return idEmisor;
    }

    public void setIdEmisor(Long idEmisor) {
        this.idEmisor = idEmisor;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }
}
