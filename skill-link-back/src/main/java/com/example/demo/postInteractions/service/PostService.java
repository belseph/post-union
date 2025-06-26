package com.example.demo.postInteractions.service;

import com.example.demo.postInteractions.controller.WebSocketMessageController; // ✅ AGREGAR: Importar WebSocket controller
import com.example.demo.postInteractions.dto.CommentDTO;
import com.example.demo.postInteractions.dto.PostDTO;
import com.example.demo.postInteractions.model.Post;
import com.example.demo.postInteractions.model.TargetType;
import com.example.demo.user.model.User;
import com.example.demo.postInteractions.repository.PostRepository;
import com.example.demo.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.OffsetDateTime; // ✅ AGREGAR: Para OffsetDateTime
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ReactionService reactionService;
    private final CommentService commentService;
    private final WebSocketMessageController webSocketMessageController; // ✅ AGREGAR: WebSocket controller

    @Autowired
    public PostService(PostRepository postRepository,
                       UserRepository userRepository,
                       ReactionService reactionService,
                       CommentService commentService,
                       WebSocketMessageController webSocketMessageController) { // ✅ AGREGAR: Al constructor
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.reactionService = reactionService;
        this.commentService = commentService;
        this.webSocketMessageController = webSocketMessageController; // ✅ AGREGAR: Asignar
    }

    // Convierte Post a PostDTO con menos datos innecesarios
    private PostDTO convertToDto(Post post, Long currentUserId) {
        if (post == null) {
            return null;
        }

        PostDTO postDTO = new PostDTO(post);

        // OPTIMIZACIÓN: Solo agregar reacciones si hay alguna
        Map<String, Long> reactionsLong = reactionService.getReactionsCountForTarget(post.getId(), TargetType.POST);

        // Filtrar solo las reacciones que tienen conteo > 0
        Map<String, Integer> reactionsWithCounts = reactionsLong.entrySet().stream()
                .filter(entry -> entry.getValue() > 0) // Solo las que tienen conteo
                .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().intValue()));

        // Solo setear si hay reacciones
        if (!reactionsWithCounts.isEmpty()) {
            postDTO.setReactions(reactionsWithCounts);
        }

        // OPTIMIZACIÓN: Solo agregar userReaction si existe
        if (currentUserId != null) {
            String userReaction = reactionService.getUserReactionForTarget(currentUserId, post.getId(), TargetType.POST);
            if (userReaction != null) { // Solo setear si no es null
                postDTO.setUserReaction(userReaction);
            }
        }

        // Llenar los comentarios
        List<CommentDTO> commentDTOs = commentService.getCommentsByPostId(post.getId(), currentUserId);
        if (!commentDTOs.isEmpty()) {
            postDTO.setComments(commentDTOs);
        }

        return postDTO;
    }

    public List<PostDTO> getAllPosts(Long currentUserId) {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(post -> convertToDto(post, currentUserId))
                .collect(Collectors.toList());
    }

    public Optional<PostDTO> getPostById(Long id, Long currentUserId) {
        Optional<Post> postOptional = postRepository.findById(id);
        return postOptional.map(post -> convertToDto(post, currentUserId));
    }

    public Post createPost(Post post, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado con ID: " + userId));

        post.setUser(user);
        // ✅ CORREGIDO: Usar OffsetDateTime.now() directamente
        post.setFechaPublicacion(OffsetDateTime.now());
        post.setUltimaActualizacion(OffsetDateTime.now());

        return postRepository.save(post);
    }

    public Post updatePost(Long id, Post postDetails) {
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post no encontrado con ID: " + id));

        existingPost.setTitulo(postDetails.getTitulo());
        existingPost.setContenido(postDetails.getContenido());
        // ✅ CORREGIDO: Usar OffsetDateTime.now() directamente
        existingPost.setUltimaActualizacion(OffsetDateTime.now());

        Post updatedPost = postRepository.save(existingPost);

        // ✅ AGREGAR: Notificar actualización vía WebSocket
        PostDTO postDTO = convertToDto(updatedPost, null);
        webSocketMessageController.notifyPostUpdate(postDTO);

        return updatedPost;
    }

    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new EntityNotFoundException("Post no encontrado con ID: " + id);
        }

        // ✅ AGREGAR: Notificar eliminación vía WebSocket ANTES de eliminar
        webSocketMessageController.notifyPostDelete(id);

        postRepository.deleteById(id);
    }

    public List<PostDTO> getPostsByUserId(Long userId, Long currentUserId) {
        List<Post> posts = postRepository.findByUser_Id(userId);
        return posts.stream()
                .map(post -> convertToDto(post, currentUserId))
                .collect(Collectors.toList());
    }
}