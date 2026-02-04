package com.naren.insurance.dto.mapper;

import com.naren.insurance.dto.response.PolicyResponse;
import com.naren.insurance.model.Policy;

public final class PolicyMapper {

    private PolicyMapper() {
    }

    public static PolicyResponse toResponse(Policy policy) {
        return new PolicyResponse(
                policy.getId(),
                policy.getPolicyName(),
                policy.getPremiumAmount(),
                policy.getStatus().name()
        );
    }
}