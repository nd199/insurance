package com.naren.insurance.dto.response;

import java.math.BigDecimal;

public record PolicyResponse(
        Long id,
        String policyName,
        BigDecimal premiumAmount,
        String status
) {
}