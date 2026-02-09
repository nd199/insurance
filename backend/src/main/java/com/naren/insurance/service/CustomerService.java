package com.naren.insurance.service;

import com.naren.insurance.model.Customer;
import com.naren.insurance.model.Policy;
import com.naren.insurance.model.PolicyAssignment;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CustomerService {

    Customer registerCustomer(String fullName, String email, String phoneNumber);

    Customer getCustomerById(Long customerId);

    List<Customer> getAllCustomers();

    Customer updateCustomer(Long customerId, String fullName, String phoneNumber);

    void deleteCustomer(Long customerId);

    Optional<Customer> findByEmail(String email);

    List<PolicyAssignment> getCustomerPolicies(Long customerId);

    List<PolicyAssignment> getActivePolicies(Long customerId);

    Customer assignPolicy(Long customerId, Long policyId, LocalDate startDate, LocalDate endDate);

    void terminatePolicy(Long customerId, Long policyId, LocalDate terminationDate);

    Customer extendPolicy(Long customerId, Long policyId, LocalDate newEndDate);

    List<Customer> searchCustomersByName(String name);

    boolean isCustomerEligibleForPolicy(Long customerId, Long policyId);
}