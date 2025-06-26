package com.example.demo.postInteractions.dto;

import com.example.demo.postInteractions.model.TargetType;
import java.util.Map;
import java.util.Objects;

public class ReactionNotificationDTO {
    private String targetId;
    private TargetType targetType;
    private Map<String, Long> reactionCounts;
    private String userReaction;

    public ReactionNotificationDTO() {
    }

    public ReactionNotificationDTO(String targetId, TargetType targetType, Map<String, Long> reactionCounts, String userReaction) {
        this.targetId = targetId;
        this.targetType = targetType;
        this.reactionCounts = reactionCounts;
        this.userReaction = userReaction;
    }

    public String getTargetId() {
        return targetId;
    }

    public TargetType getTargetType() {
        return targetType;
    }

    public Map<String, Long> getReactionCounts() {
        return reactionCounts;
    }

    public String getUserReaction() {
        return userReaction;
    }

    public void setTargetId(String targetId) {
        this.targetId = targetId;
    }

    public void setTargetType(TargetType targetType) {
        this.targetType = targetType;
    }

    public void setReactionCounts(Map<String, Long> reactionCounts) {
        this.reactionCounts = reactionCounts;
    }

    public void setUserReaction(String userReaction) {
        this.userReaction = userReaction;
    }

    @Override
    public String toString() {
        return "ReactionNotificationDTO{" +
                "targetId='" + targetId + '\'' +
                ", targetType=" + targetType +
                ", reactionCounts=" + reactionCounts +
                ", userReaction='" + userReaction + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReactionNotificationDTO that = (ReactionNotificationDTO) o;
        return Objects.equals(targetId, that.targetId) &&
                targetType == that.targetType &&
                Objects.equals(reactionCounts, that.reactionCounts) &&
                Objects.equals(userReaction, that.userReaction);
    }

    @Override
    public int hashCode() {
        return Objects.hash(targetId, targetType, reactionCounts, userReaction);
    }
}