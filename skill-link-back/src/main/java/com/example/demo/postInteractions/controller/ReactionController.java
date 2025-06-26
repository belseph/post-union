package com.example.demo.postInteractions.controller;

import com.example.demo.postInteractions.model.TargetType;
import com.example.demo.postInteractions.service.ReactionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reactions")
public class ReactionController {

    private final ReactionService reactionService;

    @Autowired
    public ReactionController(ReactionService reactionService) {
        this.reactionService = reactionService;
    }

    @PostMapping
    public ResponseEntity<Void> createReaction(
                                                @RequestParam Long userId,
                                                @RequestParam Long targetId,
                                                @RequestParam TargetType targetType,
                                                @RequestParam Long reactionTypeId) {
        try {
            reactionService.createOrUpdateReaction(userId, targetId, targetType, reactionTypeId);
            return new ResponseEntity<>(HttpStatus.CREATED); // 201 Created
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 409 Conflict
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400 Bad Request
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteReaction(
            @RequestParam Long userId,
            @RequestParam Long targetId,
            @RequestParam TargetType targetType) {
        try {
            reactionService.deleteReaction(userId, targetId, targetType);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping
    public ResponseEntity<Void> updateReaction(
            @RequestParam Long userId,
            @RequestParam Long targetId,
            @RequestParam TargetType targetType,
            @RequestParam Long newReactionTypeId) {
        try {
            reactionService.createOrUpdateReaction(userId, targetId, targetType, newReactionTypeId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            // Si la reacción original o el nuevo tipo de reacción no se encuentran
            return ResponseEntity.notFound().build(); // 404 Not Found
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET: Obtener el conteo de reacciones para un target (Post o Comment)
    @GetMapping("/counts")
    public ResponseEntity<Map<String, Long>> getReactionsCountForTarget(
            @RequestParam Long targetId,
            @RequestParam TargetType targetType) {
        try {
            Map<String, Long> counts = reactionService.getReactionsCountForTarget(targetId, targetType);
            return ResponseEntity.ok(counts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // NUEVO ENDPOINT: Obtener la reacción de un usuario específico a un target
    @GetMapping("/user-reaction")
    public ResponseEntity<String> getUserReaction(
            @RequestParam Long userId,
            @RequestParam Long targetId,
            @RequestParam TargetType targetType) {
        try {
            String userReactionType = reactionService.getUserReactionForTarget(userId, targetId, targetType);
            if (userReactionType == null) {
                return ResponseEntity.status(HttpStatus.OK).body(null);
            }
            return ResponseEntity.ok(userReactionType);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}