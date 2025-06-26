package com.example.demo.postInteractions.model;

import com.example.demo.user.model.User;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.OffsetDateTime; // Importación clave
import java.util.Objects; // Necesario para equals y hashCode

@Entity
@Table(name = "reacciones")
public class Reaction {

    @EmbeddedId
    private ReactionId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "id_usuario", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_reaccion", nullable = false)
    private ReactionType reactionType;

    @Column(name = "fecha_reaccion", nullable = false)
    private OffsetDateTime fechaReaccion;

    public Reaction() {
    }

    public Reaction(ReactionId id, User user, ReactionType reactionType, OffsetDateTime fechaReaccion) {
        this.id = id;
        this.user = user;
        this.reactionType = reactionType;
        this.fechaReaccion = fechaReaccion;
    }

    public ReactionId getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public ReactionType getReactionType() {
        return reactionType;
    }

    public OffsetDateTime getFechaReaccion() {
        return fechaReaccion;
    }

    public void setId(ReactionId id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setReactionType(ReactionType reactionType) {
        this.reactionType = reactionType;
    }

    public void setFechaReaccion(OffsetDateTime fechaReaccion) {
        this.fechaReaccion = fechaReaccion;
    }


    // Solo se utiliza aqui
    @Embeddable
    public static class ReactionId implements Serializable {
        private Long userId;
        private Long targetId;
        @Enumerated(EnumType.STRING)
        private TargetType targetType;

        public ReactionId() {
        }

        public ReactionId(Long userId, Long targetId, TargetType targetType) {
            this.userId = userId;
            this.targetId = targetId;
            this.targetType = targetType;
        }

        public Long getUserId() {
            return userId;
        }

        public Long getTargetId() {
            return targetId;
        }

        public TargetType getTargetType() {
            return targetType;
        }

        // Setters
        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public void setTargetId(Long targetId) {
            this.targetId = targetId;
        }

        public void setTargetType(TargetType targetType) {
            this.targetType = targetType;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            ReactionId that = (ReactionId) o;
            return Objects.equals(userId, that.userId) &&
                    Objects.equals(targetId, that.targetId) &&
                    targetType == that.targetType;
        }

        @Override
        public int hashCode() {
            return Objects.hash(userId, targetId, targetType);
        }

        @Override
        public String toString() {
            return "ReactionId{" +
                    "userId=" + userId +
                    ", targetId=" + targetId +
                    ", targetType=" + targetType +
                    '}';
        }
    }
}