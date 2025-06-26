package com.example.demo.user.dto;

public record UserLoginRequest(
        String email,
        String password
) {
}