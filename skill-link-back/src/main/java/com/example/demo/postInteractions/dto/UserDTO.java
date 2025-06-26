package com.example.demo.postInteractions.dto;

import com.example.demo.user.model.User;
import java.util.Objects;

public class UserDTO {
    private String id;
    private String name;
    private String title;
    private Boolean verified;

    public UserDTO() {
    }

    public UserDTO(String id, String name, String title, Boolean verified) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.verified = verified;
    }

    public UserDTO(User user) {
        if (user != null) {
            this.id = user.getId() != null ? user.getId().toString() : null;
            this.name = user.getName();
            this.title = String.valueOf(user.getRole());
            this.verified = user.isActive()
            ;
        }
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getTitle() {
        return title;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", title='" + title + '\'' +
                ", verified=" + verified +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDTO userDTO = (UserDTO) o;
        return Objects.equals(id, userDTO.id) &&
                Objects.equals(name, userDTO.name) &&
                Objects.equals(title, userDTO.title) &&
                Objects.equals(verified, userDTO.verified);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, title, verified);
    }
}