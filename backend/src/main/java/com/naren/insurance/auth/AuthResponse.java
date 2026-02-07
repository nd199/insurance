package com.naren.insurance.auth;

public record AuthResponse(
        Long id,
        String username,
        String role
) {}