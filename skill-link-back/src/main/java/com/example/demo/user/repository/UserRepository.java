package com.example.demo.user.repository;

import com.example.demo.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails findByEmail(String email);
    Optional<User> findUserByEmail(String email);
    boolean existsByEmail(String email);
}