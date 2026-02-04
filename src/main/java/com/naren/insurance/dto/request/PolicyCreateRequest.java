package com.naren.insurance.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

public record PolicyCreateRequest(

        @NotBlank(message = "Policy name is required")
        String policyName,

        @DecimalMin(value = "0.0", inclusive = false)
        BigDecimal premiumAmount
) {
}