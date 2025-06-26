package com.example.demo.user.dto;

public record PasswordResetResponse(
        String mensaje,
        boolean exito,
        String correo
) {
    // Constructor para casos sin correo
    public PasswordResetResponse(String mensaje, boolean exito) {
        this(mensaje, exito, null);
    }

    // Métodos de utilidad para crear respuestas comunes
    public static PasswordResetResponse exito(String mensaje, String correo) {
        return new PasswordResetResponse(mensaje, true, correo);
    }

    public static PasswordResetResponse error(String mensaje) {
        return new PasswordResetResponse(mensaje, false, null);
    }
}