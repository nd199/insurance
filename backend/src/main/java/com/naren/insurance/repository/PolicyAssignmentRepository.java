package com.naren.insurance.repository;

import com.naren.insurance.model.PolicyAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyAssignmentRepository extends JpaRepository<PolicyAssignment, Long> {
}