package com.naren.insurance.service;

import com.naren.insurance.model.Customer;

import java.util.List;

public interface CustomerService {

    Customer registerCustomer(String fullName, String email, String phoneNumber);

    Customer getCustomerById(Long customerId);

    List<Customer> getAllCustomers();
}