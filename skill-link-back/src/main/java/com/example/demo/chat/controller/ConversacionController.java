package com.example.demo.chat.controller;

import com.example.demo.chat.dto.ConversacionResumenDTO;
import com.example.demo.chat.dto.CrearConversacionRequest;
import com.example.demo.chat.model.Conversacion;
import com.example.demo.chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversaciones")
public class ConversacionController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<Conversacion> crearConversacion(@RequestBody CrearConversacionRequest request) {
        Conversacion conversacion = chatService.obtenerOCrearConversacion(
                request.getIdUsuario1(),
                request.getIdUsuario2()
        );
        return ResponseEntity.ok(conversacion);
    }

    // Obtener todas las conversaciones de un usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Conversacion>> listarConversaciones(@PathVariable Long idUsuario) {
        List<Conversacion> conversaciones = chatService.listarConversacionesDeUsuario(idUsuario);
        return ResponseEntity.ok(conversaciones);
    }

    @GetMapping("/resumen/{idUsuario}")
    public ResponseEntity<List<ConversacionResumenDTO>> listarResumenes(@PathVariable Long idUsuario) {
        List<ConversacionResumenDTO> resumenes = chatService.listarResumenesConversacionesDeUsuario(idUsuario);
        return ResponseEntity.ok(resumenes);
    }

}
