package com.naren.insurance.dto.mapper;

import com.naren.insurance.dto.request.AdminCreateRequest;
import com.naren.insurance.dto.response.AdminResponse;
import com.naren.insurance.model.Admin;

public class AdminMapper {

    public static Admin toEntity(AdminCreateRequest request) {
        return Admin.builder()
                .username(request.username())
                .password(request.password())
                .role(request.role())
                .build();
    }

    public static AdminResponse toResponse(Admin admin) {
        return new AdminResponse(
                admin.getId(),
                admin.getUsername(),
                admin.getRole()
        );
    }
}