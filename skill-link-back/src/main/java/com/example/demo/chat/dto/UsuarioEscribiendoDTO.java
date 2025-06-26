package com.example.demo.chat.dto;

public class UsuarioEscribiendoDTO {

    private Long idConversacion;
    private Long idUsuario;

    public UsuarioEscribiendoDTO() {}

    public UsuarioEscribiendoDTO(Long idConversacion, Long idUsuario) {
        this.idConversacion = idConversacion;
        this.idUsuario = idUsuario;
    }

    public Long getIdConversacion() {
        return idConversacion;
    }

    public void setIdConversacion(Long idConversacion) {
        this.idConversacion = idConversacion;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }
}
