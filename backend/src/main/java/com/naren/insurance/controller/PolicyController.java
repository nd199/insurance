package com.naren.insurance.controller;

import com.naren.insurance.dto.mapper.PolicyMapper;
import com.naren.insurance.dto.request.PolicyCreateRequest;
import com.naren.insurance.dto.response.PolicyResponse;
import com.naren.insurance.service.PolicyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @PostMapping
    public PolicyResponse createPolicy(
            @RequestBody PolicyCreateRequest request
    ) {
        return PolicyMapper.toResponse(
                policyService.createPolicy(
                        request.policyName(),
                        request.premiumAmount()
                )
        );
    }

    @GetMapping("/{id}")
    public PolicyResponse getPolicyById(@PathVariable Long id) {
        return PolicyMapper.toResponse(
                policyService.getPolicyById(id)
        );
    }

    @GetMapping
    public List<PolicyResponse> getAllPolicies() {
        return policyService.getAllPolicies()
                .stream()
                .map(PolicyMapper::toResponse)
                .toList();
    }

    @PutMapping("/{id}/expire")
    public void expirePolicy(@PathVariable Long id) {
        policyService.expirePolicy(id);
    }
}