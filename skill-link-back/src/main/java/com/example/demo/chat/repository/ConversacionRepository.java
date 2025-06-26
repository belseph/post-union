package com.example.demo.chat.repository;

import com.example.demo.chat.model.Conversacion;
import com.example.demo.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConversacionRepository extends JpaRepository<Conversacion, Long> {

    Optional<Conversacion> findByUsuario1AndUsuario2(User usuario1, User usuario2);
    Optional<Conversacion> findByUsuario2AndUsuario1(User usuario1, User usuario2);
    List<Conversacion> findByUsuario1OrUsuario2(User usuario1, User usuario2);
}
