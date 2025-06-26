package com.example.demo.common;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum UserInterest {

    TECNOLOGIA("Tecnología"),
    NEGOCIOS_EMPRENDIMIENTO("Negocios y Emprendimiento"),
    ARTE_CREATIVIDAD("Arte y Creatividad"),
    CIENCIA_EDUCACION("Ciencia y Educación"),
    IDIOMAS_CULTURA("Idiomas y Cultura"),
    SALUD_BIENESTAR("Salud y Bienestar"),
    DEPORTES("Deportes"),
    MEDIO_AMBIENTE("Medio ambiente y Sostenibilidad"),
    DESARROLLO_PERSONAL("Desarrollo Personal"),
    VIDEOJUEGOS_ENTRETENIMIENTO("Video Juegos y Entretenimiento");

    private final String value;

    UserInterest(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static UserInterest fromValue(String value) {
        for (UserInterest interest : UserInterest.values()) {
            if (interest.value.equalsIgnoreCase(value.trim())) {
                return interest;
            }
        }
        throw new IllegalArgumentException("Desconocido el interés ingresado: " + value);
    }
}