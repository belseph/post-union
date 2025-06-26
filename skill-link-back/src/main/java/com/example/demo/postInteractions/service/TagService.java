package com.example.demo.postInteractions.service;

import com.example.demo.postInteractions.model.Post;
import com.example.demo.postInteractions.model.Tag;
import com.example.demo.postInteractions.repository.PostRepository;
import com.example.demo.postInteractions.repository.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TagService {

    private final TagRepository tagRepository;
    private final PostRepository postRepository;

    @Autowired
    public TagService(TagRepository tagRepository, PostRepository postRepository) {
        this.tagRepository = tagRepository;
        this.postRepository = postRepository;
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Optional<Tag> getTagById(Long id) {
        return tagRepository.findById(id);
    }

    public Optional<Tag> getTagByName(String nombreEtiqueta) {
        return tagRepository.findByNombreEtiqueta(nombreEtiqueta);
    }

    public Tag createTag(String nombreEtiqueta) {
        // Verificar si ya existe
        Optional<Tag> existingTag = tagRepository.findByNombreEtiqueta(nombreEtiqueta);
        if (existingTag.isPresent()) {
            return existingTag.get();
        }

        Tag newTag = new Tag();
        newTag.setNombreEtiqueta(nombreEtiqueta);
        return tagRepository.save(newTag);
    }

    public void deleteTag(Long id) {
        if (!tagRepository.existsById(id)) {
            throw new EntityNotFoundException("Etiqueta no encontrada con ID: " + id);
        }
        tagRepository.deleteById(id);
    }

    public Post addTagsToPost(Long postId, List<String> tagNames) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post no encontrado con ID: " + postId));

        Set<Tag> tagsToAdd = new HashSet<>();

        for (String tagName : tagNames) {
            // Buscar si la etiqueta ya existe, si no, crearla
            Tag tag = tagRepository.findByNombreEtiqueta(tagName)
                    .orElseGet(() -> createTag(tagName));
            tagsToAdd.add(tag);
        }

        // Agregar las nuevas etiquetas al post (sin eliminar las existentes)
        post.getTags().addAll(tagsToAdd);

        return postRepository.save(post);
    }

    public Post setTagsToPost(Long postId, List<String> tagNames) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post no encontrado con ID: " + postId));

        // Limpiar etiquetas existentes
        post.getTags().clear();

        // Agregar las nuevas etiquetas
        Set<Tag> newTags = new HashSet<>();

        for (String tagName : tagNames) {
            Tag tag = tagRepository.findByNombreEtiqueta(tagName)
                    .orElseGet(() -> createTag(tagName));
            newTags.add(tag);
        }

        post.getTags().addAll(newTags);

        return postRepository.save(post);
    }

    public Post removeTagsFromPost(Long postId, List<String> tagNames) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post no encontrado con ID: " + postId));

        for (String tagName : tagNames) {
            Optional<Tag> tagOptional = tagRepository.findByNombreEtiqueta(tagName);
            if (tagOptional.isPresent()) {
                post.getTags().remove(tagOptional.get());
            }
        }

        return postRepository.save(post);
    }

    public List<Post> getPostsByTag(String tagName) {
        Optional<Tag> tagOptional = tagRepository.findByNombreEtiqueta(tagName);
        if (tagOptional.isPresent()) {
            Tag tag = tagOptional.get();
            return tag.getPosts().stream().toList();
        }
        return List.of();
    }
}