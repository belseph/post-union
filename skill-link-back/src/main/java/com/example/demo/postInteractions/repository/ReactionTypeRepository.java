package com.example.demo.postInteractions.repository;

import com.example.demo.postInteractions.model.ReactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReactionTypeRepository extends JpaRepository<ReactionType, Long> {
    Optional<ReactionType> findByNombreReaccion(String nombreReaccion);
}