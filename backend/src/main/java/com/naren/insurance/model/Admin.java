package com.naren.insurance.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.*;

@Entity
@Table(
        name = "admins",
        uniqueConstraints = @UniqueConstraint(columnNames = "username")
)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Admin extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 20)
    private String role;

    public void updatePassword(String hashedPassword) {
        this.password = hashedPassword;
    }

    public void updateRole(String role) {
        this.role = role;
    }
}