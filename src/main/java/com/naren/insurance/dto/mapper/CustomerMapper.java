package com.naren.insurance.dto.mapper;

import com.naren.insurance.dto.response.CustomerResponse;
import com.naren.insurance.model.Customer;

public final class CustomerMapper {

    private CustomerMapper() {
    }

    public static CustomerResponse toResponse(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getFullName(),
                customer.getEmail(),
                customer.getPhoneNumber()
        );
    }
}