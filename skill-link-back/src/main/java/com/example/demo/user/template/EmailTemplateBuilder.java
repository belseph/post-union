package com.example.demo.user.template;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EmailTemplateBuilder {

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public String construirPlantillaRecuperacion(String nombreUsuario, String enlaceRecuperacion) {
        return "<!DOCTYPE html>" +
                "<html lang=\"es\">" +
                "<head>" +
                "<meta charset=\"UTF-8\">" +
                "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "<title>Recuperación de Contraseña - SkillLink</title>" +
                "<style>" +
                "* {" +
                "margin: 0;" +
                "padding: 0;" +
                "box-sizing: border-box;" +
                "}" +

                "body {" +
                "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;" +
                "line-height: 1.6;" +
                "color: #333;" +
                "background-color: #f3f4f6;" +
                "padding: 20px;" +
                "}" +

                ".container {" +
                "max-width: 600px;" +
                "margin: 0 auto;" +
                "background: white;" +
                "border-radius: 12px;" +
                "box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" +
                "overflow: hidden;" +
                "border: 1px solid #e5e7eb;" +
                "}" +

                ".header {" +
                "background-color: #7c3aed;" +
                "padding: 30px;" +
                "text-align: center;" +
                "}" +

                ".logo {" +
                "display: inline-flex;" +
                "align-items: center;" +
                "justify-content: center;" +
                "gap: 12px;" +
                "margin-bottom: 15px;" +
                "}" +

                ".logo-icon {" +
                "font-size: 32px;" +
                "line-height: 1;" +
                "display: block;" +
                "text-align: center;" +
                "}" +

                ".logo-text {" +
                "color: white;" +
                "font-size: 28px;" +
                "font-weight: 700;" +
                "}" +

                ".header-subtitle {" +
                "color: rgba(255, 255, 255, 0.9);" +
                "font-size: 14px;" +
                "font-weight: 500;" +
                "}" +

                ".content {" +
                "padding: 40px 30px;" +
                "background: white;" +
                "}" +

                ".greeting {" +
                "font-size: 22px;" +
                "font-weight: 600;" +
                "color: #1f2937;" +
                "margin-bottom: 20px;" +
                "text-align: center;" +
                "}" +

                ".message {" +
                "font-size: 16px;" +
                "color: #4b5563;" +
                "margin-bottom: 30px;" +
                "text-align: justify;" +
                "line-height: 1.7;" +
                "}" +

                ".highlight {" +
                "font-weight: 700;" +
                "}" +

                ".cta-container {" +
                "text-align: center;" +
                "margin: 30px 0;" +
                "}" +

                ".cta-button {" +
                "display: inline-block;" +
                "background-color: #7c3aed;" +
                "color: white !important;" +
                "text-decoration: none !important;" +
                "padding: 14px 28px;" +
                "border-radius: 8px;" +
                "font-weight: 600;" +
                "font-size: 16px;" +
                "transition: background-color 0.3s ease;" +
                "}" +

                ".cta-button:hover {" +
                "background-color: #6d28d9;" +
                "}" +

                "@media (max-width: 600px) {" +
                ".container {" +
                "margin: 10px;" +
                "border-radius: 8px;" +
                "}" +

                ".header, .content {" +
                "padding: 25px 20px;" +
                "}" +

                ".logo-text {" +
                "font-size: 24px;" +
                "}" +

                ".greeting {" +
                "font-size: 20px;" +
                "}" +

                ".cta-button {" +
                "padding: 12px 24px;" +
                "font-size: 15px;" +
                "color: white;" +
                "font-weight: bold;" +
                "}" +
                "}" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class=\"container\">" +
                "<div class=\"header\">" +
                "<div class=\"logo\">" +
                "<div class=\"logo-icon\">💡</div>" +
                "<div class=\"logo-text\">SkillLink</div>" +
                "</div>" +
                "<div class=\"header-subtitle\">Plataforma Emprendedora</div>" +
                "</div>" +

                "<div class=\"content\">" +
                "<div class=\"greeting\">¡Hola " + nombreUsuario + "!</div>" +

                "<div class=\"message\">" +
                "Recibimos una solicitud para restablecer la contraseña de tu cuenta. " +
                "Para continuar con el proceso, haz click en el botón de abajo. " +
                "Este enlace permanecerá activo durante <span class=\"highlight\">15 minutos</span>." +
                "</div>" +

                "<div class=\"cta-container\">" +
                "<a href=\"" + enlaceRecuperacion + "\" class=\"cta-button\">" +
                "🔐 Restablecer mi contraseña" +
                "</a>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }
}