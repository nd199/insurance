package com.naren.insurance.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdminCreateRequest(
        @NotBlank @Size(min = 4, max = 50) String username,
        @NotBlank @Size(min = 6, max = 100) String password,
        @NotBlank String role
) {
}