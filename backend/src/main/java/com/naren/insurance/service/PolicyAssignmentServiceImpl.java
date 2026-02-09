package com.naren.insurance.service;

import com.naren.insurance.exception.BusinessRuleViolationException;
import com.naren.insurance.exception.ResourceNotFoundException;
import com.naren.insurance.model.PolicyAssignment;
import com.naren.insurance.model.PolicyStatus;
import com.naren.insurance.repository.PolicyAssignmentRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@Transactional
public class PolicyAssignmentServiceImpl implements PolicyAssignmentService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(PolicyAssignmentServiceImpl.class);

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
        log.info("Assigning policy {} to customer {} starting {}", policyId, customerId, startDate);

        if (startDate == null || startDate.isBefore(LocalDate.now())) {
            throw new BusinessRuleViolationException("Start date must not be in the past");
        }

        var customer = customerService.getCustomerById(customerId);
        var policy = policyService.getPolicyById(policyId);

        if (policy.getStatus() == PolicyStatus.EXPIRED) {
            log.warn("Cannot assign expired policy {} to customer {}", policyId, customerId);
            throw new BusinessRuleViolationException("Cannot assign expired policy");
        }

        boolean alreadyAssigned = assignmentRepository.existsByCustomerIdAndPolicyId(customerId, policyId);
        if (alreadyAssigned) {
            log.warn("Policy {} is already assigned to customer {}", policyId, customerId);
            throw new BusinessRuleViolationException("Policy already assigned to customer");
        }

        PolicyAssignment assignment = PolicyAssignment.builder()
                .customer(customer)
                .policy(policy)
                .startDate(startDate)
                .build();

        PolicyAssignment saved = assignmentRepository.save(assignment);
        log.info("Policy {} assigned successfully to customer {}", policyId, customerId);
        return saved;
    }


    @Override
    public List<PolicyAssignment> getAllAssignments() {
        log.debug("Fetching all policy assignments");
        return assignmentRepository.findAll();
    }

    @Override
    public void terminateAssignment(Long assignmentId, LocalDate endDate) {
        log.info("Terminating assignment {} at {}", assignmentId, endDate);

        var assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found with ID " + assignmentId));

        if (endDate.isBefore(assignment.getStartDate())) {
            log.warn("Invalid termination date {} for assignment {}", endDate, assignmentId);
            throw new BusinessRuleViolationException("Termination date cannot be before start date");
        }

        assignment.terminate(endDate);
        assignmentRepository.save(assignment);
        log.info("Assignment {} terminated successfully", assignmentId);
    }

    @Override
    public List<PolicyAssignment> getAssignmentsForCustomer(Long customerId) {
        log.debug("Fetching assignments for customer {}", customerId);
        customerService.getCustomerById(customerId); // validate existence
        return assignmentRepository.findByCustomerId(customerId);
    }
}