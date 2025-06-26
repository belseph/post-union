package com.example.demo.postInteractions.controller;

import com.example.demo.postInteractions.dto.PostDTO;
import com.example.demo.postInteractions.model.Post;
import com.example.demo.postInteractions.service.PostService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts(@RequestParam(value = "currentUserId", required = false) Long currentUserId) {
        // El PostService ya devuelve List<PostDTO> y maneja la conversión y reacciones.
        List<PostDTO> posts = postService.getAllPosts(currentUserId);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable Long id,
                                               @RequestParam(value = "currentUserId", required = false) Long currentUserId) {
        // El PostService ya devuelve Optional<PostDTO>
        Optional<PostDTO> post = postService.getPostById(id, currentUserId);
        return post.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/byUser/{userId}")
    public ResponseEntity<List<PostDTO>> getPostsByUserId(@PathVariable Long userId,
                                                          @RequestParam(value = "currentUserId", required = false) Long currentUserId) {
        // El PostService ya devuelve List<PostDTO>
        List<PostDTO> posts = postService.getPostsByUserId(userId, currentUserId);
        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build(); // O ResponseEntity.ok(List.of()) si quieres devolver una lista vacía
        }
        return ResponseEntity.ok(posts);
    }

    @PostMapping
    public ResponseEntity<PostDTO> createPost(@RequestBody Post post, @RequestParam("userId") Long userId) {
        try {
            // El servicio crea y guarda la entidad Post.
            Post savedPostEntity = postService.createPost(post, userId);

            // Luego, obtenemos el PostDTO completo, incluyendo reacciones e información del usuario,
            // llamando al método getPostById del servicio. Aquí, el userId que crea el post es el
            // currentUserId para obtener su reacción (que sería null inicialmente en un post nuevo).
            PostDTO savedPostDTO = postService.getPostById(savedPostEntity.getId(), userId)
                    .orElseThrow(() -> new RuntimeException("Error al recuperar el PostDTO después de la creación."));

            return new ResponseEntity<>(savedPostDTO, HttpStatus.CREATED);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> updatePost(@PathVariable Long id,
                                              @RequestBody Post postDetails,
                                              @RequestParam(value = "currentUserId", required = false) Long currentUserId) {
        try {
            // El servicio actualiza y guarda la entidad Post.
            Post updatedPostEntity = postService.updatePost(id, postDetails);

            // Luego, obtenemos el PostDTO completo para la respuesta.
            PostDTO updatedPostDTO = postService.getPostById(updatedPostEntity.getId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Error al recuperar el PostDTO después de la actualización."));

            return ResponseEntity.ok(updatedPostDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        try {
            postService.deletePost(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}