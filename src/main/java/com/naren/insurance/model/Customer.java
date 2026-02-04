package com.naren.insurance.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "customers", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Customer extends BaseEntity {

    @NotBlank
    @Column(nullable = false, length = 100)
    private String fullName;

    @Email
    @Column(nullable = false, length = 150)
    private String email;

    @Column(length = 20)
    private String phoneNumber;

    public void updateFullName(String fullName) {
        this.fullName = fullName;
    }

    public void updatePhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}