package com.example.demo.user.service;

import com.example.demo.user.template.EmailTemplateBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import java.util.concurrent.CompletableFuture;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailTemplateBuilder templateBuilder;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Async("emailTaskExecutor")
    public CompletableFuture<Void> enviarCorreoRecuperacion(String destinatario, String nombreUsuario, String token) {
        try {
            System.out.println("📧 [ASYNC] Iniciando envío de correo de recuperación...");
            System.out.println("   - Hilo: " + Thread.currentThread().getName());
            System.out.println("   - Destinatario: " + destinatario);
            System.out.println("   - Token: " + token);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, "SkillLink - Plataforma Emprendedora");
            helper.setTo(destinatario);
            helper.setSubject("🔐 Recuperación de Contraseña - SkillLink");

            String enlaceRecuperacion = frontendUrl + "/reset-password?token=" + token;
            String contenidoHtml = templateBuilder.construirPlantillaRecuperacion(nombreUsuario, enlaceRecuperacion);

            helper.setText(contenidoHtml, true);

            mailSender.send(message);

            System.out.println("✅ [ASYNC] Correo de recuperación enviado exitosamente a: " + destinatario);
            System.out.println("🔗 Enlace generado: " + enlaceRecuperacion);

            return CompletableFuture.completedFuture(null);

        } catch (Exception e) {
            System.err.println("❌ [ASYNC] Error al enviar correo de recuperación a: " + destinatario);
            System.err.println("   Error: " + e.getMessage());
            e.printStackTrace();
            return CompletableFuture.failedFuture(e);
        }
    }
}