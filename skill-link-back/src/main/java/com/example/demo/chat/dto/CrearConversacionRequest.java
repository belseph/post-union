package com.example.demo.chat.dto;

public class CrearConversacionRequest {
    private Long idUsuario1;
    private Long idUsuario2;

    public Long getIdUsuario1() {
        return idUsuario1;
    }

    public void setIdUsuario1(Long idUsuario1) {
        this.idUsuario1 = idUsuario1;
    }

    public Long getIdUsuario2() {
        return idUsuario2;
    }

    public void setIdUsuario2(Long idUsuario2) {
        this.idUsuario2 = idUsuario2;
    }
}
