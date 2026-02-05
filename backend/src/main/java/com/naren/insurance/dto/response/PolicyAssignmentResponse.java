package com.naren.insurance.dto.response;

import java.time.LocalDate;

public record PolicyAssignmentResponse(
        Long assignmentId,
        Long customerId,
        String customerName,
        Long policyId,
        String policyName,
        LocalDate startDate,
        LocalDate endDate
) {
}