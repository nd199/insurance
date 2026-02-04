package com.naren.insurance.service;

import com.naren.insurance.model.Policy;
import com.naren.insurance.repository.PolicyRepository;
import com.naren.insurance.service.PolicyService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class PolicyServiceImpl implements PolicyService {

    private final PolicyRepository policyRepository;

    public PolicyServiceImpl(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public Policy createPolicy(String policyName, BigDecimal premiumAmount) {
        Policy policy = new Policy(policyName, premiumAmount);
        return policyRepository.save(policy);
    }

    @Override
    public Policy getPolicyById(Long policyId) {
        return policyRepository.findById(policyId)
                .orElseThrow(() -> new IllegalArgumentException("Policy not found"));
    }

    @Override
    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    @Override
    public void expirePolicy(Long policyId) {
        Policy policy = getPolicyById(policyId);
        policy.expire();
    }
}