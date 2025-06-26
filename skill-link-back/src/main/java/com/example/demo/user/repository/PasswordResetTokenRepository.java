package com.example.demo.user.repository;

import com.example.demo.user.model.PasswordResetToken;
import com.example.demo.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    @Query("SELECT COUNT(p) > 0 FROM PasswordResetToken p WHERE p.usuario = :usuario AND p.usado = false AND p.fechaExpiracion > :now")
    boolean existsValidTokenForUsuario(@Param("usuario") User usuario, @Param("now") OffsetDateTime now);

    @Modifying
    @Query("DELETE FROM PasswordResetToken p WHERE p.usuario = :usuario")
    void deleteByUsuario(@Param("usuario") User usuario);

    @Modifying
    @Query("DELETE FROM PasswordResetToken p WHERE p.fechaExpiracion < :now")
    int deleteExpiredTokens(@Param("now") OffsetDateTime now);
}