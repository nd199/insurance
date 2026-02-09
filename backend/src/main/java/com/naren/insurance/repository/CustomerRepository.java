package com.naren.insurance.repository;

import com.naren.insurance.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    boolean existsByEmail(String email);
    Optional<Customer> findByEmail(String email);
    List<Customer> findByFullNameContainingIgnoreCase(String name);
    List<Customer> findByFullNameContainingIgnoreCaseAndEmailContainingIgnoreCase(String name, String email);
}