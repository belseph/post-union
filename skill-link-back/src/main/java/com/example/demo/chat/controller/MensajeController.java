package com.example.demo.chat.controller;

import com.example.demo.chat.dto.EnviarMensajeRequest;
import com.example.demo.chat.dto.MarcarLeidosRequest;
import com.example.demo.chat.dto.MensajeCompletoDTO;
import com.example.demo.chat.dto.MensajeDTO;
import com.example.demo.chat.model.Mensaje;
import com.example.demo.chat.service.ChatService;
import com.example.demo.chat.service.MensajeTransformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mensajes")
public class MensajeController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MensajeTransformService mensajeTransformService;

    @PostMapping
    public ResponseEntity<Mensaje> enviarMensaje(@RequestBody EnviarMensajeRequest request) {
        System.out.println("📨 REST: Enviando mensaje...");
        System.out.println("📋 Conversación: " + request.getIdConversacion() + ", Emisor: " + request.getIdEmisor());
        System.out.println("💬 Contenido: " + request.getContenido());

        Mensaje mensaje = chatService.enviarMensaje(
                request.getIdConversacion(),
                request.getIdEmisor(),
                request.getContenido()
        );

        System.out.println("Mensaje guardado con ID: " + mensaje.getId());

        try {
            System.out.println("REST: Enviando notificación WebSocket a topic: /topic/conversacion/" + request.getIdConversacion());

            // ✅ USAR SERVICIO DE TRANSFORMACIÓN
            MensajeCompletoDTO mensajeCompleto = mensajeTransformService.transformToCompleteDTO(mensaje);

            System.out.println("REST: Enviando mensaje completo con emisor: " + mensajeCompleto.getEmisor().getNombre());

            messagingTemplate.convertAndSend(
                    "/topic/conversacion/" + request.getIdConversacion(),
                    mensajeCompleto
            );
            System.out.println("REST: Notificación WebSocket enviada exitosamente!");
        } catch (Exception e) {
            System.err.println("REST: Error enviando notificación WebSocket: " + e.getMessage());
            e.printStackTrace();
        }

        return ResponseEntity.ok(mensaje);
    }

    //  Obtener últimos mensajes (compatibilidad)
    @GetMapping("/conversacion/{idConversacion}")
    public ResponseEntity<List<MensajeDTO>> obtenerUltimosMensajes(@PathVariable Long idConversacion) {
        System.out.println("REST: Obteniendo últimos mensajes para conversación: " + idConversacion);

        List<MensajeDTO> mensajesDTO = chatService.obtenerMensajesDTO(idConversacion);

        System.out.println("REST: Devolviendo " + mensajesDTO.size() + " mensajes");
        return ResponseEntity.ok(mensajesDTO);
    }

    // Obtener mensajes con paginación
    @GetMapping("/conversacion/{idConversacion}/paginado")
    public ResponseEntity<List<MensajeDTO>> obtenerMensajesPaginados(
            @PathVariable Long idConversacion,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        System.out.println("REST: Obteniendo mensajes paginados - Conversación: " + idConversacion +
                ", Página: " + page + ", Tamaño: " + size);

        List<MensajeDTO> mensajesDTO = chatService.obtenerMensajesPaginados(idConversacion, page, size);

        System.out.println("REST: Devolviendo " + mensajesDTO.size() + " mensajes de la página " + page);
        return ResponseEntity.ok(mensajesDTO);
    }

    @PutMapping("/leer")
    public ResponseEntity<Void> marcarMensajesComoLeidos(@RequestBody MarcarLeidosRequest request) {
        chatService.marcarMensajesComoLeidos(request.getIdConversacion(), request.getIdUsuario());
        return ResponseEntity.ok().build();
    }
}