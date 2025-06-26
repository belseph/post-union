package com.example.demo.user.model;

import com.example.demo.chat.model.Conversacion;
import com.example.demo.common.Role;
import com.example.demo.common.UserInterest;
import com.example.demo.user.dto.UserRegisterRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="usuarios")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String name;

    @Column(name = "apellido", nullable = false)
    private String secondName;

    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @Column(name = "contrasena", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "usuario1")
    private List<Conversacion>conversacionesComoUsuario1;

    @OneToMany(mappedBy = "usuario2")
    private List<Conversacion>conversacionesComoUsuario2;

    @Column(name = "activo")
    private boolean active = true;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "usuario_intereses", joinColumns = @JoinColumn(name = "usuario_id"))
    @Column(name = "interes", nullable = false)
    @Enumerated(EnumType.STRING)
    private List<UserInterest> interests;

    @Column(name = "fecha_registro")
    @CreationTimestamp
    private OffsetDateTime registrationDate;

    public User() {}

    public User(UserRegisterRequest userRegisterRequest){
        this.name = userRegisterRequest.name();
        this.secondName = userRegisterRequest.secondName();
        this.email = userRegisterRequest.email();
        this.password = userRegisterRequest.password();
        this.role = userRegisterRequest.role();
        this.interests = userRegisterRequest.interests();
        this.registrationDate = OffsetDateTime.now(ZoneOffset.UTC);
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<UserInterest> getInterests() {
        return interests;
    }

    public void setInterests(List<UserInterest> interests) {
        this.interests = interests;
    }

    public OffsetDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(OffsetDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    // UserDetails implementation
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.active;
    }
}