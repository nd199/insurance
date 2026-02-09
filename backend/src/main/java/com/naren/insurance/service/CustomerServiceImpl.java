package com.naren.insurance.service;

import com.naren.insurance.exception.BusinessRuleViolationException;
import com.naren.insurance.exception.ResourceNotFoundException;
import com.naren.insurance.model.Customer;
import com.naren.insurance.model.PolicyAssignment;
import com.naren.insurance.repository.CustomerRepository;
import com.naren.insurance.repository.PolicyAssignmentRepository;
import com.naren.insurance.repository.PolicyRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final PolicyRepository policyRepository;
    private final PolicyAssignmentRepository policyAssignmentRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository,
                               PolicyRepository policyRepository,
                               PolicyAssignmentRepository policyAssignmentRepository) {
        this.customerRepository = customerRepository;
        this.policyRepository = policyRepository;
        this.policyAssignmentRepository = policyAssignmentRepository;
    }

    @Override
    public Customer registerCustomer(String fullName, String email, String phoneNumber) {
        log.info("Registering new customer: {}", email);
        if (customerRepository.existsByEmail(email)) {
            log.warn("Attempt to register existing email: {}", email);
            throw new BusinessRuleViolationException("Customer with email " + email + " already exists");
        }

        Customer customer = Customer.builder()
                .fullName(fullName)
                .email(email)
                .phoneNumber(phoneNumber)
                .build();

        Customer savedCustomer = customerRepository.save(customer);
        log.info("Customer registered successfully with ID: {}", savedCustomer.getId());
        return savedCustomer;
    }

    @Override
    public Customer getCustomerById(Long customerId) {
        log.debug("Fetching customer with ID: {}", customerId);
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID " + customerId));
    }

    @Override
    public List<Customer> getAllCustomers() {
        log.debug("Fetching all customers");
        return customerRepository.findAll();
    }

    @Override
    public Customer updateCustomer(Long customerId, String fullName, String phoneNumber) {
        log.info("Updating customer with ID: {}", customerId);
        Customer customer = getCustomerById(customerId);

        if (fullName != null && !fullName.isBlank()) {
            customer.updateFullName(fullName);
        }
        if (phoneNumber != null && !phoneNumber.isBlank()) {
            customer.updatePhoneNumber(phoneNumber);
        }

        Customer updated = customerRepository.save(customer);
        log.info("Customer updated successfully: {}", updated.getId());
        return updated;
    }

    @Override
    public void deleteCustomer(Long customerId) {
        log.info("Deleting customer with ID: {}", customerId);
        Customer customer = getCustomerById(customerId);

        List<PolicyAssignment> activePolicies = getActivePolicies(customerId);
        if (!activePolicies.isEmpty()) {
            log.warn("Cannot delete customer {} with active policies", customerId);
            throw new BusinessRuleViolationException("Cannot delete customer with active policies");
        }

        customerRepository.delete(customer);
        log.info("Customer deleted successfully: {}", customerId);
    }

    @Override
    public Optional<Customer> findByEmail(String email) {
        log.debug("Searching customer by email: {}", email);
        return customerRepository.findByEmail(email);
    }

    @Override
    public List<PolicyAssignment> getCustomerPolicies(Long customerId) {
        getCustomerById(customerId); // validate existence
        log.debug("Fetching policies for customer ID: {}", customerId);
        return policyAssignmentRepository.findByCustomerId(customerId);
    }

    @Override
    public List<PolicyAssignment> getActivePolicies(Long customerId) {
        log.debug("Fetching active policies for customer ID: {}", customerId);
        return policyAssignmentRepository.findActivePoliciesByCustomer(customerId, LocalDate.now());
    }

    @Override
    public Customer assignPolicy(Long customerId, Long policyId, LocalDate startDate, LocalDate endDate) {
        log.info("Assigning policy {} to customer {}", policyId, customerId);

        Customer customer = getCustomerById(customerId);

        policyRepository.findById(policyId)
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found with ID " + policyId));

        boolean exists = policyAssignmentRepository.existsByCustomerIdAndPolicyId(customerId, policyId);
        if (exists) {
            log.warn("Policy {} already assigned to customer {}", policyId, customerId);
            throw new BusinessRuleViolationException("Policy already assigned to customer");
        }

        PolicyAssignment assignment = PolicyAssignment.builder()
                .customer(customer)
                .policy(policyRepository.getReferenceById(policyId))
                .startDate(startDate)
                .endDate(endDate)
                .build();

        policyAssignmentRepository.save(assignment);
        log.info("Policy {} assigned successfully to customer {}", policyId, customerId);
        return customer;
    }

    @Override
    public void terminatePolicy(Long customerId, Long policyId, LocalDate terminationDate) {
        log.info("Terminating policy {} for customer {}", policyId, customerId);

        List<PolicyAssignment> assignments = policyAssignmentRepository.findByCustomerIdAndPolicyId(customerId, policyId);
        if (assignments.isEmpty()) {
            log.warn("No policy assignment found for termination: policy {} customer {}", policyId, customerId);
            throw new ResourceNotFoundException("Policy assignment not found");
        }

        PolicyAssignment assignment = assignments.get(0);
        assignment.terminate(terminationDate);
        policyAssignmentRepository.save(assignment);
        log.info("Policy {} terminated for customer {}", policyId, customerId);
    }

    @Override
    public Customer extendPolicy(Long customerId, Long policyId, LocalDate newEndDate) {
        log.info("Extending policy {} for customer {} to {}", policyId, customerId, newEndDate);

        List<PolicyAssignment> assignments = policyAssignmentRepository.findByCustomerIdAndPolicyId(customerId, policyId);
        if (assignments.isEmpty()) {
            log.warn("Policy assignment not found for extension: policy {} customer {}", policyId, customerId);
            throw new ResourceNotFoundException("Policy assignment not found");
        }

        PolicyAssignment assignment = assignments.get(0);
        assignment.extend(newEndDate);
        policyAssignmentRepository.save(assignment);
        log.info("Policy {} extended successfully for customer {}", policyId, customerId);

        return getCustomerById(customerId);
    }

    @Override
    public List<Customer> searchCustomersByName(String name) {
        log.debug("Searching customers by name containing: {}", name);
        return customerRepository.findByFullNameContainingIgnoreCase(name);
    }

    @Override
    public boolean isCustomerEligibleForPolicy(Long customerId, Long policyId) {
        getCustomerById(customerId);
        policyRepository.findById(policyId)
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found"));

        boolean eligible = !policyAssignmentRepository.existsByCustomerIdAndPolicyId(customerId, policyId) ||
                policyAssignmentRepository.findActivePoliciesByCustomer(customerId, LocalDate.now()).stream()
                        .noneMatch(a -> a.getPolicy().getId().equals(policyId));

        log.debug("Customer {} eligibility for policy {}: {}", customerId, policyId, eligible);
        return eligible;
    }
}