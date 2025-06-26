package com.example.demo.postInteractions.repository;

import com.example.demo.postInteractions.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByNombreEtiqueta(String nombreEtiqueta);
}