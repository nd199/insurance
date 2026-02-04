package com.naren.insurance.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(
    name = "policy_assignments",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"customer_id", "policy_id"})
    }
)
public class PolicyAssignment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "policy_id")
    private Policy policy;

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate endDate;

    protected PolicyAssignment() {
        // JPA only
    }

    public PolicyAssignment(Customer customer, Policy policy, LocalDate startDate) {
        this.customer = customer;
        this.policy = policy;
        this.startDate = startDate;
    }

    public void terminate(LocalDate endDate) {
        this.endDate = endDate;
        this.policy.expire();
    }

    public Customer getCustomer() {
        return customer;
    }

    public Policy getPolicy() {
        return policy;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }
}