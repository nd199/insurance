package com.naren.insurance.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "policies")
public class Policy extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String policyName;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal premiumAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PolicyStatus status;

    protected Policy() {
        // JPA only
    }

    public Policy(String policyName, BigDecimal premiumAmount) {
        this.policyName = policyName;
        this.premiumAmount = premiumAmount;
        this.status = PolicyStatus.ACTIVE;
    }

    public void expire() {
        this.status = PolicyStatus.EXPIRED;
    }

    public String getPolicyName() {
        return policyName;
    }

    public BigDecimal getPremiumAmount() {
        return premiumAmount;
    }

    public PolicyStatus getStatus() {
        return status;
    }
}