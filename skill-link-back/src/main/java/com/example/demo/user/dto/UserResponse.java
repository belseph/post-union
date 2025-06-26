package com.example.demo.user.dto;

import com.example.demo.common.Role;

public record UserResponse(
        Long id,
        String name,
        String secondName,
        String email,
        Role role
) {
}
