package com.naren.insurance.repository;

import com.naren.insurance.model.PolicyAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PolicyAssignmentRepository extends JpaRepository<PolicyAssignment, Long> {
    List<PolicyAssignment> findByCustomerId(Long customerId);
    
    List<PolicyAssignment> findByCustomerIdAndEndDateIsNullOrEndDateAfter(Long customerId, LocalDate date);
    
    List<PolicyAssignment> findByCustomerIdAndPolicyId(Long customerId, Long policyId);
    
    @Query("SELECT pa FROM PolicyAssignment pa WHERE pa.customer.id = :customerId AND pa.startDate <= :date AND (pa.endDate IS NULL OR pa.endDate >= :date)")
    List<PolicyAssignment> findActivePoliciesByCustomer(@Param("customerId") Long customerId, @Param("date") LocalDate date);
    
    boolean existsByCustomerIdAndPolicyId(Long customerId, Long policyId);
}