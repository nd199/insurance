package com.naren.insurance.dto.response;

public record CustomerResponse(
        Long id,
        String fullName,
        String email,
        String phoneNumber
) {
}