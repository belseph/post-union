package com.example.demo.postInteractions.dto;

import java.util.Objects;

public class CreateTagRequest {
    private String nombreEtiqueta;

    public CreateTagRequest() {
    }

    public CreateTagRequest(String nombreEtiqueta) {
        this.nombreEtiqueta = nombreEtiqueta;
    }

    public String getNombreEtiqueta() {
        return nombreEtiqueta;
    }

    public void setNombreEtiqueta(String nombreEtiqueta) {
        this.nombreEtiqueta = nombreEtiqueta;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CreateTagRequest that = (CreateTagRequest) o;
        return Objects.equals(nombreEtiqueta, that.nombreEtiqueta);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nombreEtiqueta);
    }

    @Override
    public String toString() {
        return "CreateTagRequest{" +
                "nombreEtiqueta='" + nombreEtiqueta + '\'' +
                '}';
    }
}