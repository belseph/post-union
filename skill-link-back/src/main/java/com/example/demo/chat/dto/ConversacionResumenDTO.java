package com.example.demo.chat.dto;

import java.time.LocalDateTime;

public class ConversacionResumenDTO {

    private Long idConversacion;
    private Long idOtroUsuario;
    private String nombreOtroUsuario;
    private String emailOtroUsuario;
    private String ultimoMensaje;
    private LocalDateTime timestampUltimoMensaje;
    private int mensajesNoLeidos;

    public ConversacionResumenDTO() {
    }

    public ConversacionResumenDTO(Long idConversacion, Long idOtroUsuario, String nombreOtroUsuario,
                                  String emailOtroUsuario, String ultimoMensaje,
                                  LocalDateTime timestampUltimoMensaje, int mensajesNoLeidos) {
        this.idConversacion = idConversacion;
        this.idOtroUsuario = idOtroUsuario;
        this.nombreOtroUsuario = nombreOtroUsuario;
        this.emailOtroUsuario = emailOtroUsuario;
        this.ultimoMensaje = ultimoMensaje;
        this.timestampUltimoMensaje = timestampUltimoMensaje;
        this.mensajesNoLeidos = mensajesNoLeidos;
    }

    public Long getIdConversacion() {
        return idConversacion;
    }

    public void setIdConversacion(Long idConversacion) {
        this.idConversacion = idConversacion;
    }

    public Long getIdOtroUsuario() {
        return idOtroUsuario;
    }

    public void setIdOtroUsuario(Long idOtroUsuario) {
        this.idOtroUsuario = idOtroUsuario;
    }

    public String getNombreOtroUsuario() {
        return nombreOtroUsuario;
    }

    public void setNombreOtroUsuario(String nombreOtroUsuario) {
        this.nombreOtroUsuario = nombreOtroUsuario;
    }

    public String getEmailOtroUsuario() {
        return emailOtroUsuario;
    }

    public void setEmailOtroUsuario(String emailOtroUsuario) {
        this.emailOtroUsuario = emailOtroUsuario;
    }

    public String getUltimoMensaje() {
        return ultimoMensaje;
    }

    public void setUltimoMensaje(String ultimoMensaje) {
        this.ultimoMensaje = ultimoMensaje;
    }

    public LocalDateTime getTimestampUltimoMensaje() {
        return timestampUltimoMensaje;
    }

    public void setTimestampUltimoMensaje(LocalDateTime timestampUltimoMensaje) {
        this.timestampUltimoMensaje = timestampUltimoMensaje;
    }

    public int getMensajesNoLeidos() {
        return mensajesNoLeidos;
    }

    public void setMensajesNoLeidos(int mensajesNoLeidos) {
        this.mensajesNoLeidos = mensajesNoLeidos;
    }
}
