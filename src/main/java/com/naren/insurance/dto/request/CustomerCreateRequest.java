package com.naren.insurance.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CustomerCreateRequest(

        @NotBlank(message = "Full name is required")
        @Size(min = 3, max = 100)
        String fullName,

        @NotBlank
        @Email(message = "Invalid email format")
        String email,

        @NotBlank
        @Pattern(
                regexp = "^[0-9]{10}$",
                message = "Phone number must be 10 digits"
        )
        String phoneNumber
) {
}