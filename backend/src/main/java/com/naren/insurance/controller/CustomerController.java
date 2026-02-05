package com.naren.insurance.controller;

import com.naren.insurance.dto.mapper.CustomerMapper;
import com.naren.insurance.dto.request.CustomerCreateRequest;
import com.naren.insurance.dto.response.CustomerResponse;
import com.naren.insurance.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public CustomerResponse createCustomer(
            @RequestBody CustomerCreateRequest request
    ) {
        return CustomerMapper.toResponse(
                customerService.registerCustomer(
                        request.fullName(),
                        request.email(),
                        request.phoneNumber()
                )
        );
    }

    @GetMapping("/{id}")
    public CustomerResponse getCustomerById(@PathVariable Long id) {
        return CustomerMapper.toResponse(
                customerService.getCustomerById(id)
        );
    }

    @GetMapping
    public List<CustomerResponse> getAllCustomers() {
        return customerService.getAllCustomers()
                .stream()
                .map(CustomerMapper::toResponse)
                .toList();
    }
}