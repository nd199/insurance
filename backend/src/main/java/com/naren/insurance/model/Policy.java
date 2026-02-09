package com.naren.insurance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "policies")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Policy extends BaseEntity {

    @NotBlank
    @Column(nullable = false, length = 100)
    private String policyName;

    @Positive
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal premiumAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PolicyStatus status;

    public void expire() {
        this.status = PolicyStatus.EXPIRED;
    }

    public void suspend() {
        this.status = PolicyStatus.SUSPENDED;
    }

    public void cancel() {
        this.status = PolicyStatus.CANCELLED;
    }

    public void activate() {
        this.status = PolicyStatus.ACTIVE;
    }
}