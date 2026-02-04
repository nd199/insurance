package com.naren.insurance.service;

import com.naren.insurance.model.Policy;

import java.math.BigDecimal;
import java.util.List;

public interface PolicyService {

    Policy createPolicy(String policyName, BigDecimal premiumAmount);

    Policy getPolicyById(Long policyId);

    List<Policy> getAllPolicies();

    void expirePolicy(Long policyId);
}