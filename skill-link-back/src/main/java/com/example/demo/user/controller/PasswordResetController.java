package com.example.demo.user.controller;

import com.example.demo.user.dto.ForgotPasswordRequest;
import com.example.demo.user.dto.PasswordResetResponse;
import com.example.demo.user.dto.ResetPasswordRequest;
import com.example.demo.user.service.PasswordResetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    /**
     * Endpoint para solicitar recuperación de contraseña
     * POST /usuarios/recover-password
     */
    @PostMapping("/recover-password")
    public ResponseEntity<PasswordResetResponse> solicitarRecuperacion(
            @Valid @RequestBody ForgotPasswordRequest request) {

        System.out.println("=== ENDPOINT RECOVER-PASSWORD ===");
        System.out.println("Solicitud recibida para: " + request.correo());

        PasswordResetResponse response = passwordResetService.solicitarRecuperacion(request);

        // Siempre devolvemos 200 OK por seguridad (no revelamos si el email existe)
        return ResponseEntity.ok(response);
    }

    /**
     * Endpoint para validar un token de recuperación
     * GET /usuarios/validate-reset-token?token=xxx
     */
    @GetMapping("/validate-reset-token")
    public ResponseEntity<PasswordResetResponse> validarToken(
            @RequestParam("token") String token) {

        System.out.println("=== ENDPOINT VALIDATE-RESET-TOKEN ===");
        System.out.println("Validación solicitada para token: " + token);

        PasswordResetResponse response = passwordResetService.validarToken(token);

        if (response.exito()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    /**
     * Endpoint para cambiar contraseña con token
     * POST /usuarios/reset-password
     */
    @PostMapping("/reset-password")
    public ResponseEntity<PasswordResetResponse> cambiarContrasena(
            @Valid @RequestBody ResetPasswordRequest request) {

        System.out.println("=== ENDPOINT RESET-PASSWORD ===");
        System.out.println("Solicitud de cambio de contraseña recibida");

        PasswordResetResponse response = passwordResetService.cambiarContrasena(request);

        if (response.exito()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}