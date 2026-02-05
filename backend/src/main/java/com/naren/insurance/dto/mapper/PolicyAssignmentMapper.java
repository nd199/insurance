package com.naren.insurance.dto.mapper;

import com.naren.insurance.dto.response.PolicyAssignmentResponse;
import com.naren.insurance.model.PolicyAssignment;

public final class PolicyAssignmentMapper {

    private PolicyAssignmentMapper() {
    }

    public static PolicyAssignmentResponse toResponse(PolicyAssignment assignment) {
        return new PolicyAssignmentResponse(
                assignment.getId(),
                assignment.getCustomer().getId(),
                assignment.getCustomer().getFullName(),
                assignment.getPolicy().getId(),
                assignment.getPolicy().getPolicyName(),
                assignment.getStartDate(),
                assignment.getEndDate()
        );
    }
}