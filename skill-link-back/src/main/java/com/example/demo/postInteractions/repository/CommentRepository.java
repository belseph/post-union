package com.example.demo.postInteractions.repository;

import com.example.demo.postInteractions.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Encontrar todos los comentarios de un post específico, ordenados por fecha
    List<Comment> findByPost_IdOrderByFechaComentarioAsc(Long postId);

    // Encontrar comentarios de nivel superior (aquellos sin parentComment) de un post
    List<Comment> findByPost_IdAndParentCommentIsNullOrderByFechaComentarioAsc(Long postId);

    // Encontrar todas las respuestas a un comentario padre específico
    List<Comment> findByParentComment_IdOrderByFechaComentarioAsc(Long parentCommentId);
}