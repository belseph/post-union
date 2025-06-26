package com.example.demo.user.dto;

import com.example.demo.common.Role;
import com.example.demo.common.UserInterest;

import java.util.List;

public record UserLoginResponse(
        String token,
        Long userId,
        String name,
        String secondName,
        String email,
        Role role,
        List<UserInterest> interests
) {
}