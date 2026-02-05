package com.naren.insurance.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PolicyAssignmentRequest(

        @NotNull
        Long customerId,

        @NotNull
        Long policyId,

        @NotNull
        LocalDate startDate
) {
}