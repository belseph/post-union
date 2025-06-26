package com.example.demo.chat.model;

import com.example.demo.user.model.User;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "conversaciones")
public class Conversacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario1_id")
    private User usuario1;

    @ManyToOne
    @JoinColumn(name = "usuario2_id")
    private User usuario2;

    @OneToMany(mappedBy = "conversacion", cascade = CascadeType.ALL)
    private List<Mensaje> mensajes;

    // Getters y setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public User getUsuario1() { return usuario1; }

    public void setUsuario1(User usuario1) { this.usuario1 = usuario1; }

    public User getUsuario2() { return usuario2; }

    public void setUsuario2(User usuario2) { this.usuario2 = usuario2; }

    public List<Mensaje> getMensajes() { return mensajes; }

    public void setMensajes(List<Mensaje> mensajes) { this.mensajes = mensajes; }
}
