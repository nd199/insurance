package com.naren.insurance.service;

import com.naren.insurance.model.PolicyAssignment;

import java.time.LocalDate;
import java.util.List;

public interface PolicyAssignmentService {

    PolicyAssignment assignPolicy(
            Long customerId,
            Long policyId,
            LocalDate startDate
    );

    List<PolicyAssignment> getAllAssignments();

    void terminateAssignment(Long assignmentId, LocalDate endDate);

    List<PolicyAssignment> getAssignmentsForCustomer(Long customerId);
}