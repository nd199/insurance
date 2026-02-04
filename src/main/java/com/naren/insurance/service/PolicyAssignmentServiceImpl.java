package com.naren.insurance.service;

import com.naren.insurance.model.PolicyAssignment;
import com.naren.insurance.repository.PolicyAssignmentRepository;
import com.naren.insurance.service.CustomerService;
import com.naren.insurance.service.PolicyAssignmentService;
import com.naren.insurance.service.PolicyService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class PolicyAssignmentServiceImpl implements PolicyAssignmentService {

    private final PolicyAssignmentRepository assignmentRepository;
    private final CustomerService customerService;
    private final PolicyService policyService;

    public PolicyAssignmentServiceImpl(
            PolicyAssignmentRepository assignmentRepository,
            CustomerService customerService,
            PolicyService policyService
    ) {
        this.assignmentRepository = assignmentRepository;
        this.customerService = customerService;
        this.policyService = policyService;
    }

    @Override
    public PolicyAssignment assignPolicy(Long customerId, Long policyId, LocalDate startDate) {
        PolicyAssignment assignment = new PolicyAssignment(
                customerService.getCustomerById(customerId),
                policyService.getPolicyById(policyId),
                startDate
        );
        return assignmentRepository.save(assignment);
    }

    @Override
    public List<PolicyAssignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    @Override
    public void terminateAssignment(Long assignmentId, LocalDate endDate) {
        PolicyAssignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new IllegalArgumentException("Assignment not found"));

        assignment.terminate(endDate);
    }
}