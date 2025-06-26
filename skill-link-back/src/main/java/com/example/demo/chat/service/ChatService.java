package com.example.demo.chat.service;

import com.example.demo.chat.dto.ConversacionResumenDTO;
import com.example.demo.chat.dto.MensajeDTO;
import com.example.demo.chat.model.Conversacion;
import com.example.demo.chat.model.Mensaje;
import com.example.demo.user.model.User;
import com.example.demo.chat.repository.ConversacionRepository;
import com.example.demo.chat.repository.MensajeRepository;
import com.example.demo.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private UserRepository usuarioRepository;

    @Autowired
    private ConversacionRepository conversacionRepository;

    @Autowired
    private MensajeRepository mensajeRepository;

    // Buscar o crear conversación entre dos usuarios
    public Conversacion obtenerOCrearConversacion(Long idUsuario1, Long idUsuario2) {
        User u1 = usuarioRepository.findById(idUsuario1)
                .orElseThrow(() -> new RuntimeException("Usuario 1 no encontrado"));
        User u2 = usuarioRepository.findById(idUsuario2)
                .orElseThrow(() -> new RuntimeException("Usuario 2 no encontrado"));

        Optional<Conversacion> existente = conversacionRepository.findByUsuario1AndUsuario2(u1, u2);
        if (existente.isEmpty()) {
            existente = conversacionRepository.findByUsuario2AndUsuario1(u1, u2);
        }

        return existente.orElseGet(() -> {
            Conversacion nueva = new Conversacion();
            nueva.setUsuario1(u1);
            nueva.setUsuario2(u2);
            return conversacionRepository.save(nueva);
        });
    }

    public Mensaje enviarMensaje(Long idConversacion, Long idEmisor, String contenido) {
        System.out.println("ChatService: Guardando mensaje...");
        System.out.println("Conversación: " + idConversacion + ", Emisor: " + idEmisor);

        Conversacion conversacion = conversacionRepository.findById(idConversacion)
                .orElseThrow(() -> new RuntimeException("Conversación no encontrada"));
        User emisor = usuarioRepository.findById(idEmisor)
                .orElseThrow(() -> new RuntimeException("Emisor no encontrado"));

        System.out.println("Emisor encontrado: " + emisor.getName() + " (ID: " + emisor.getId() + ")");

        Mensaje mensaje = new Mensaje();
        mensaje.setContenido(contenido);
        mensaje.setConversacion(conversacion);
        mensaje.setEmisor(emisor);
        mensaje.setTimestampEnvio(LocalDateTime.now());

        Mensaje mensajeGuardado = mensajeRepository.save(mensaje);

        if (mensajeGuardado.getEmisor() == null) {
            System.err.println("ERROR CRÍTICO: Mensaje guardado sin emisor!");
            throw new RuntimeException("Error: Mensaje guardado sin emisor");
        }

        System.out.println("Mensaje guardado exitosamente con emisor: " + mensajeGuardado.getEmisor().getName());
        return mensajeGuardado;
    }

    // Obtener últimos 20 mensajes (para optimizacion)
    public List<Mensaje> obtenerUltimosMensajes(Long idConversacion) {
        Conversacion conversacion = conversacionRepository.findById(idConversacion)
                .orElseThrow(() -> new RuntimeException("Conversación no encontrada"));

        List<Mensaje> mensajes = mensajeRepository
                .findTop20ByConversacionOrderByTimestampEnvioDesc(conversacion);

        mensajes.sort(Comparator.comparing(Mensaje::getTimestampEnvio));
        return mensajes;
    }

    // Obtener mensajes con paginación
    public List<MensajeDTO> obtenerMensajesPaginados(Long idConversacion, int page, int size) {
        System.out.println("ChatService: Obteniendo mensajes paginados - Conversación: " + idConversacion + ", Página: " + page + ", Tamaño: " + size);

        Conversacion conversacion = conversacionRepository.findById(idConversacion)
                .orElseThrow(() -> new RuntimeException("Conversación no encontrada"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("timestampEnvio").descending());
        Page<Mensaje> mensajesPage = mensajeRepository.findByConversacionOrderByTimestampEnvioDesc(conversacion, pageable);
        System.out.println("Página obtenida - Total elementos: " + mensajesPage.getTotalElements() +
                ", Elementos en página: " + mensajesPage.getNumberOfElements() +
                ", Página actual: " + mensajesPage.getNumber() +
                ", Total páginas: " + mensajesPage.getTotalPages());

        // Ordenar cronológicamente (más antiguos primero)
        List<MensajeDTO> mensajesDTO = mensajesPage.getContent().stream()
                .sorted(Comparator.comparing(Mensaje::getTimestampEnvio)) // Orden cronológico para el frontend
                .map(mensaje -> new MensajeDTO(
                        mensaje.getId(),
                        mensaje.getContenido(),
                        mensaje.isLeido(),
                        mensaje.getTimestampEnvio(),
                        mensaje.getEmisor().getId(),
                        mensaje.getEmisor().getName(),
                        mensaje.getEmisor().getEmail()
                ))
                .collect(Collectors.toList());

        System.out.println("Mensajes DTO creados: " + mensajesDTO.size());
        return mensajesDTO;
    }

    // Obtener mensajes DTO (para endpoint existente)
    public List<MensajeDTO> obtenerMensajesDTO(Long idConversacion) {
        System.out.println("ChatService: Obteniendo mensajes DTO para conversación: " + idConversacion);

        List<Mensaje> mensajes = obtenerUltimosMensajes(idConversacion);

        return mensajes.stream()
                .map(mensaje -> new MensajeDTO(
                        mensaje.getId(),
                        mensaje.getContenido(),
                        mensaje.isLeido(),
                        mensaje.getTimestampEnvio(),
                        mensaje.getEmisor().getId(),
                        mensaje.getEmisor().getName(),
                        mensaje.getEmisor().getEmail()
                ))
                .collect(Collectors.toList());
    }

    public List<Conversacion> listarConversacionesDeUsuario(Long idUsuario) {
        User usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return conversacionRepository.findByUsuario1OrUsuario2(usuario, usuario);
    }

    public List<ConversacionResumenDTO> listarResumenesConversacionesDeUsuario(Long idUsuario) {
        User actual = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<Conversacion> conversaciones = listarConversacionesDeUsuario(idUsuario);
        List<ConversacionResumenDTO> resumenes = new ArrayList<>();

        for (Conversacion c : conversaciones) {
            User otro = c.getUsuario1().getId().equals(idUsuario)
                    ? c.getUsuario2()
                    : c.getUsuario1();

            List<Mensaje> mensajes = c.getMensajes();
            if (mensajes == null || mensajes.isEmpty()) continue;

            mensajes.sort(Comparator.comparing(Mensaje::getTimestampEnvio).reversed());
            Mensaje ultimo = mensajes.get(0);

            long noLeidos = mensajes.stream()
                    .filter(m -> !m.getEmisor().getId().equals(idUsuario))
                    .filter(m -> !m.isLeido())
                    .count();

            resumenes.add(new ConversacionResumenDTO(
                    c.getId(),
                    otro.getId(),
                    otro.getName(),
                    otro.getEmail(),
                    ultimo.getContenido(),
                    ultimo.getTimestampEnvio(),
                    (int) noLeidos
            ));
        }

        resumenes.sort(Comparator.comparing(ConversacionResumenDTO::getTimestampUltimoMensaje).reversed());
        return resumenes;
    }

    public void marcarMensajesComoLeidos(Long idConversacion, Long idUsuario) {
        Conversacion conversacion = conversacionRepository.findById(idConversacion)
                .orElseThrow(() -> new RuntimeException("Conversación no encontrada"));

        User receptor = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<Mensaje> mensajesNoLeidos = mensajeRepository.findByConversacionAndEmisorNotAndLeidoFalse(
                conversacion, receptor
        );

        for (Mensaje mensaje : mensajesNoLeidos) {
            mensaje.setLeido(true);
        }

        mensajeRepository.saveAll(mensajesNoLeidos);
    }
}