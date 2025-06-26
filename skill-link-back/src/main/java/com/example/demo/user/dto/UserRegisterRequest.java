package com.example.demo.user.dto;

import com.example.demo.common.Role;
import com.example.demo.common.UserInterest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record UserRegisterRequest(
        @NotBlank(message = "El nombre es obligatorio")
        String name,

        @NotBlank(message = "El apellido es obligatorio")
        String secondName,

        @NotBlank(message = "El email es obligatorio")
        @Email(message = "El email debe tener un formato válido")
        String email,

        @NotBlank(message = "La contraseña es obligatoria")
        @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
        String password,

        @NotNull(message = "El rol es obligatorio")
        Role role,

        @NotNull(message = "Los intereses son obligatorios")
        @Size(min = 1, message = "Debe seleccionar al menos un interés")
        List<UserInterest> interests
) {
}