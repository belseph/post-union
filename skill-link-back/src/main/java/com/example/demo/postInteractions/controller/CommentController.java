// ✅ AGREGAR: Endpoint PUT para actualizar comentarios
package com.example.demo.postInteractions.controller;

import com.example.demo.postInteractions.model.Comment;
import com.example.demo.postInteractions.dto.CommentDTO;
import com.example.demo.postInteractions.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // POST: Crear un nuevo comentario (o una respuesta)
    @PostMapping
    public ResponseEntity<CommentDTO> createComment(
            @RequestBody Comment comment,
            @RequestParam("postId") Long postId,
            @RequestParam("userId") Long userId,
            @RequestParam(value = "parentCommentId", required = false) Long parentCommentId) {
        try {
            Comment savedComment = commentService.createComment(comment, userId, postId, parentCommentId);
            CommentDTO savedCommentDTO = commentService.getCommentById(savedComment.getId(), userId)
                    .orElseThrow(() -> new RuntimeException("Error al recuperar el CommentDTO después de la creación"));
            return new ResponseEntity<>(savedCommentDTO, HttpStatus.CREATED);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // ✅ AGREGAR: PUT - Actualizar un comentario existente
    @PutMapping("/{id}")
    public ResponseEntity<CommentDTO> updateComment(
            @PathVariable Long id,
            @RequestBody Comment commentDetails,
            @RequestParam(value = "currentUserId", required = false) Long currentUserId) {
        try {
            Comment updatedComment = commentService.updateComment(id, commentDetails);

            // Convertir la entidad actualizada a DTO para la respuesta
            CommentDTO updatedCommentDTO = commentService.getCommentById(updatedComment.getId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Error al recuperar el CommentDTO después de la actualización"));

            return ResponseEntity.ok(updatedCommentDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET: Obtener comentarios de un post específico
    @GetMapping("/byPost/{postId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByPostId(@PathVariable Long postId,
                                                                @RequestParam(value = "currentUserId", required = false) Long currentUserId) {
        List<CommentDTO> comments = commentService.getCommentsByPostId(postId, currentUserId);
        if (comments.isEmpty()) {
            return ResponseEntity.ok(List.of());
        }
        return ResponseEntity.ok(comments);
    }

    // GET: Obtener respuestas a un comentario específico
    @GetMapping("/byParent/{parentCommentId}")
    public ResponseEntity<List<CommentDTO>> getRepliesByParentCommentId(@PathVariable Long parentCommentId,
                                                                        @RequestParam(value = "currentUserId", required = false) Long currentUserId) {
        try {
            List<CommentDTO> replies = commentService.getRepliesByParentCommentId(parentCommentId, currentUserId);
            return ResponseEntity.ok(replies);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // GET: Obtener un comentario por su ID
    @GetMapping("/{id}")
    public ResponseEntity<CommentDTO> getCommentById(@PathVariable Long id,
                                                     @RequestParam(value = "currentUserId", required = false) Long currentUserId) {
        Optional<CommentDTO> comment = commentService.getCommentById(id, currentUserId);
        return comment.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        try {
            commentService.deleteComment(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}