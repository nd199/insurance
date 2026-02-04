package com.naren.insurance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "policy_assignments",
        uniqueConstraints = @UniqueConstraint(columnNames = {"customer_id", "policy_id"})
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA only
@AllArgsConstructor
@Builder
public class PolicyAssignment extends BaseEntity {

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "policy_id")
    private Policy policy;

    @NotNull
    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate endDate;

    public void terminate(LocalDate endDate) {
        this.endDate = endDate;
        this.policy.expire();
    }

    public void extend(LocalDate newEndDate) {
        if (newEndDate.isBefore(startDate)) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }
        this.endDate = newEndDate;
    }

    public boolean isActive() {
        LocalDate today = LocalDate.now();
        return startDate.isBefore(today) && (endDate == null || endDate.isAfter(today));
    }
}