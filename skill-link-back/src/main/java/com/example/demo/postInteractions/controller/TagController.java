package com.example.demo.postInteractions.controller;

import com.example.demo.postInteractions.dto.CreateTagRequest;
import com.example.demo.postInteractions.dto.TagsRequest;
import com.example.demo.postInteractions.dto.PostDTO;
import com.example.demo.postInteractions.model.Post;
import com.example.demo.postInteractions.model.Tag;
import com.example.demo.postInteractions.service.PostService;
import com.example.demo.postInteractions.service.TagService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TagController {

    private final TagService tagService;
    private final PostService postService;

    @Autowired
    public TagController(TagService tagService, PostService postService) {
        this.tagService = tagService;
        this.postService = postService;
    }

    @GetMapping("/tags")
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = tagService.getAllTags();
        return ResponseEntity.ok(tags);
    }

    @GetMapping("/tags/{id}")
    public ResponseEntity<Tag> getTagById(@PathVariable Long id) {
        Optional<Tag> tag = tagService.getTagById(id);
        return tag.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tags/search")
    public ResponseEntity<Tag> searchTagByName(@RequestParam String name) {
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Tag> tag = tagService.getTagByName(name);
        return tag.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/tags")
    public ResponseEntity<Tag> createTag(@RequestBody CreateTagRequest request) {
        if (request.getNombreEtiqueta() == null || request.getNombreEtiqueta().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            Tag createdTag = tagService.createTag(request.getNombreEtiqueta().trim());
            return new ResponseEntity<>(createdTag, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/tags/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        try {
            tagService.deleteTag(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ENDPOINTS PARA MANEJAR TAGS EN POSTS
    @PostMapping("/posts/{postId}/tags")
    public ResponseEntity<PostDTO> addTagsToPost(
            @PathVariable Long postId,
            @RequestBody TagsRequest request,
            @RequestHeader(value = "userId", required = false) Long currentUserId) {

        if (request.getTagNames() == null || request.getTagNames().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            Post updatedPost = tagService.addTagsToPost(postId, request.getTagNames());

            PostDTO postDTO = postService.getPostById(updatedPost.getId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Error al recuperar el PostDTO después de agregar etiquetas."));

            return ResponseEntity.ok(postDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/posts/{postId}/tags")
    public ResponseEntity<PostDTO> replacePostTags(
            @PathVariable Long postId,
            @RequestBody TagsRequest request,
            @RequestHeader(value = "userId", required = false) Long currentUserId) {

        if (request.getTagNames() == null) {
            return ResponseEntity.badRequest().build();
        }

        try {
            Post updatedPost = tagService.setTagsToPost(postId, request.getTagNames());

            PostDTO postDTO = postService.getPostById(updatedPost.getId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Error al recuperar el PostDTO después de actualizar etiquetas."));

            return ResponseEntity.ok(postDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/posts/{postId}/tags")
    public ResponseEntity<PostDTO> removeTagsFromPost(
            @PathVariable Long postId,
            @RequestBody TagsRequest request,
            @RequestHeader(value = "userId", required = false) Long currentUserId) {

        if (request.getTagNames() == null || request.getTagNames().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            Post updatedPost = tagService.removeTagsFromPost(postId, request.getTagNames());

            PostDTO postDTO = postService.getPostById(updatedPost.getId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Error al recuperar el PostDTO después de remover etiquetas."));

            return ResponseEntity.ok(postDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/tags/{tagName}/posts")
    public ResponseEntity<List<PostDTO>> getPostsByTag(
            @PathVariable String tagName,
            @RequestParam(value = "currentUserId", required = false) Long currentUserId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        if (tagName == null || tagName.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            List<Post> posts = tagService.getPostsByTag(tagName);

            List<PostDTO> postDTOs = posts.stream()
                    .skip((long) page * size)
                    .limit(size)
                    .map(post -> postService.getPostById(post.getId(), currentUserId))
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .toList();

            return ResponseEntity.ok(postDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}