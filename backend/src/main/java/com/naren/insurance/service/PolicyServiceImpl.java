package com.naren.insurance.service;

import com.naren.insurance.exception.BusinessRuleViolationException;
import com.naren.insurance.exception.ResourceNotFoundException;
import com.naren.insurance.model.Policy;
import com.naren.insurance.model.PolicyStatus;
import com.naren.insurance.repository.PolicyRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Service
@Transactional
public class PolicyServiceImpl implements PolicyService {

    private final PolicyRepository policyRepository;

    public PolicyServiceImpl(PolicyRepository policyRepository) {
        this.policyRepository = policyRepository;
    }

    @Override
    public Policy createPolicy(String policyName, BigDecimal premiumAmount) {
        log.info("Creating policy: {}", policyName);
        if (policyName == null || policyName.isBlank()) {
            throw new BusinessRuleViolationException("Policy name cannot be null or blank");
        }
        if (premiumAmount == null || premiumAmount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessRuleViolationException("Premium amount must be positive");
        }

        Policy policy = Policy.builder()
                .policyName(policyName)
                .premiumAmount(premiumAmount)
                .status(PolicyStatus.ACTIVE)
                .build();

        Policy savedPolicy = policyRepository.save(policy);
        log.info("Policy created successfully with ID: {}", savedPolicy.getId());
        return savedPolicy;
    }

    @Override
    public Policy getPolicyById(Long policyId) {
        log.debug("Fetching policy with ID: {}", policyId);
        return policyRepository.findById(policyId)
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found with ID " + policyId));
    }

    @Override
    public List<Policy> getAllPolicies() {
        log.debug("Fetching all policies");
        return policyRepository.findAll();
    }

    @Override
    public void expirePolicy(Long policyId) {
        log.info("Expiring policy with ID: {}", policyId);
        Policy policy = getPolicyById(policyId);

        if (policy.getStatus() == PolicyStatus.EXPIRED) {
            log.warn("Policy {} is already expired", policyId);
            throw new BusinessRuleViolationException("Policy is already expired");
        }

        policy.expire();
        policyRepository.save(policy);
        log.info("Policy {} expired successfully", policyId);
    }

    public Policy updatePolicy(Long policyId, String policyName, BigDecimal premiumAmount) {
        log.info("Updating policy with ID: {}", policyId);
        Policy policy = getPolicyById(policyId);

        if (policyName != null && !policyName.isBlank()) {
            policy.setPolicyName(policyName);
        }
        if (premiumAmount != null && premiumAmount.compareTo(BigDecimal.ZERO) > 0) {
            policy.setPremiumAmount(premiumAmount);
        }

        Policy updatedPolicy = policyRepository.save(policy);
        log.info("Policy {} updated successfully", policyId);
        return updatedPolicy;
    }
}