package com.example.demo.postInteractions.service;

import com.example.demo.postInteractions.model.TargetType;
import com.example.demo.postInteractions.controller.WebSocketMessageController;
import com.example.demo.postInteractions.model.Reaction;
import com.example.demo.postInteractions.model.ReactionType;
import com.example.demo.user.model.User;
import com.example.demo.postInteractions.repository.*;
import com.example.demo.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ReactionService {

    private final ReactionRepository reactionRepository;
    private final ReactionTypeRepository reactionTypeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final WebSocketMessageController webSocketMessageController;

    @Autowired
    public ReactionService(ReactionRepository reactionRepository,
                           ReactionTypeRepository reactionTypeRepository,
                           UserRepository userRepository,
                           PostRepository postRepository,
                           CommentRepository commentRepository,
                           WebSocketMessageController webSocketMessageController) {
        this.reactionRepository = reactionRepository;
        this.reactionTypeRepository = reactionTypeRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.webSocketMessageController = webSocketMessageController;
    }

    /**
     * Crea o actualiza una reacción de un usuario a un post/comentario.
     * Si el usuario ya reaccionó con el mismo tipo de reacción, se elimina la reacción (toggle off).
     * Si reacciona con un tipo diferente, se actualiza. Si no había reaccionado, se crea.
     */
    public Reaction createOrUpdateReaction(Long userId, Long targetId, TargetType targetType, Long reactionTypeId) {
        System.out.println("=== DEBUG REACTION SERVICE ===");
        System.out.println("userId: " + userId);
        System.out.println("targetId: " + targetId);
        System.out.println("targetType: " + targetType);
        System.out.println("reactionTypeId: " + reactionTypeId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ID: " + userId));

        // Verificar si el target existe (Post o Comment)
        if (targetType == TargetType.POST) {
            postRepository.findById(targetId)
                    .orElseThrow(() -> new EntityNotFoundException("Post no encontrado con ID: " + targetId));
        } else if (targetType == TargetType.COMMENT) {
            commentRepository.findById(targetId)
                    .orElseThrow(() -> new EntityNotFoundException("Comentario no encontrado con ID: " + targetId));
        } else {
            throw new IllegalArgumentException("Tipo de objetivo de reacción no válido: " + targetType);
        }

        ReactionType reactionType = reactionTypeRepository.findById(reactionTypeId)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de reacción no encontrado con ID: " + reactionTypeId));

        System.out.println("ReactionType encontrado: " + reactionType.getNombreReaccion());

        // Buscar si ya existe una reacción de este usuario para este target
        Optional<Reaction> existingReactionOpt = reactionRepository.findById_UserIdAndId_TargetIdAndId_TargetType(userId, targetId, targetType);

        Reaction savedReaction = null;

        if (existingReactionOpt.isPresent()) {
            Reaction existingReaction = existingReactionOpt.get();
            Long existingReactionTypeId = existingReaction.getReactionType().getId();

            System.out.println("Reacción existente encontrada:");
            System.out.println("  - Tipo actual: " + existingReaction.getReactionType().getNombreReaccion() + " (ID: " + existingReactionTypeId + ")");
            System.out.println("  - Nuevo tipo: " + reactionType.getNombreReaccion() + " (ID: " + reactionTypeId + ")");

            // Si el tipo de reacción es el mismo, significa que se está "desactivando" la reacción (toggle off)
            if (existingReactionTypeId.equals(reactionTypeId)) {
                System.out.println("ELIMINANDO reacción (toggle off)");
                reactionRepository.delete(existingReaction);
                savedReaction = null; // Indica eliminación
            } else {
                // Si el tipo de reacción es diferente, actualizamos la reacción existente
                System.out.println("ACTUALIZANDO reacción existente");
                existingReaction.setReactionType(reactionType);
                // *** CAMBIO AQUÍ: Usar LocalDateTime.now().atOffset(ZoneOffset.UTC) ***
                existingReaction.setFechaReaccion(LocalDateTime.now().atOffset(ZoneOffset.UTC));
                savedReaction = reactionRepository.save(existingReaction);
                System.out.println("Reacción actualizada exitosamente");
            }
        } else {
            // Crear una nueva reacción
            System.out.println("CREANDO nueva reacción");
            Reaction newReaction = new Reaction();
            newReaction.setId(new Reaction.ReactionId(userId, targetId, targetType));
            newReaction.setUser(user);
            newReaction.setReactionType(reactionType);
            // *** CAMBIO AQUÍ: Usar LocalDateTime.now().atOffset(ZoneOffset.UTC) ***
            newReaction.setFechaReaccion(LocalDateTime.now().atOffset(ZoneOffset.UTC));
            savedReaction = reactionRepository.save(newReaction);
            System.out.println("Nueva reacción creada exitosamente");
        }

        // Obtener los conteos actualizados para el target afectado
        Map<String, Long> updatedCounts = getReactionsCountForTarget(targetId, targetType);
        System.out.println("Conteos actualizados: " + updatedCounts);

        // Cada cliente consultará su propia reacción cuando reciba la notificación
        webSocketMessageController.notifyReactionChange(targetId, targetType, updatedCounts);

        System.out.println("=== FIN DEBUG REACTION SERVICE ===");
        return savedReaction;
    }

    //Elimina una reacción específica de un usuario a un post/comentario
    public void deleteReaction(Long userId, Long targetId, TargetType targetType) {
        Optional<Reaction> existingReactionOpt = reactionRepository.findById_UserIdAndId_TargetIdAndId_TargetType(userId, targetId, targetType);
        if (existingReactionOpt.isEmpty()) {
            throw new EntityNotFoundException("Reacción no encontrada para eliminar.");
        }
        reactionRepository.deleteById_UserIdAndId_TargetIdAndId_TargetType(userId, targetId, targetType);

        // Notificar a través de WebSocket sobre la eliminación (recalculando conteos)
        Map<String, Long> updatedCounts = getReactionsCountForTarget(targetId, targetType);
        webSocketMessageController.notifyReactionChange(targetId, targetType, updatedCounts);
    }

    //Obtiene el conteo de reacciones por tipo para un objetivo específico (Post o Comment).
    public Map<String, Long> getReactionsCountForTarget(Long targetId, TargetType targetType) {
        List<Object[]> counts = reactionRepository.countReactionsByTargetIdAndTargetType(targetId, targetType);
        Map<String, Long> reactionCounts = new HashMap<>();

        // Inicializar todos los tipos de reacción conocidos con 0
        reactionTypeRepository.findAll().forEach(type -> reactionCounts.put(type.getNombreReaccion(), 0L));

        // Llenar el mapa con los conteos reales obtenidos de la base de datos
        for (Object[] count : counts) {
            String reactionTypeName = (String) count[0];
            Long countValue = (Long) count[1];
            reactionCounts.put(reactionTypeName, countValue);
        }
        return reactionCounts;
    }

    //Obtiene el tipo de reacción que un usuario específico dio a un objetivo.
    public String getUserReactionForTarget(Long userId, Long targetId, TargetType targetType) {
        Optional<String> reactionName = reactionRepository.findUserReactionTypeByUserIdAndTargetIdAndTargetType(userId, targetId, targetType);
        return reactionName.orElse(null);
    }

}