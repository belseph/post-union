package com.example.demo.user.dto;

import com.example.demo.common.Role;
import com.example.demo.common.UserInterest;

import java.util.List;

public record UserRegisterResponse(
        String token,
        UserResponse user
) {
    public record UserResponse(
            Long id,
            String name,
            String secondName,
            String email,
            Role role,
            List<UserInterest> interests
    ) {}
}