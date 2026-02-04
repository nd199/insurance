package com.naren.insurance.dto.mapper;

import com.naren.insurance.dto.request.AdminCreateRequest;
import com.naren.insurance.dto.response.AdminResponse;
import com.naren.insurance.model.Admin;

public class AdminMapper {

    public static Admin toEntity(AdminCreateRequest request) {
        return new Admin(
                request.username(),
                request.password(),
                request.role()
        );
    }

    public static AdminResponse toResponse(Admin admin) {
        return new AdminResponse(
                admin.getId(),
                admin.getUsername(),
                admin.getRole()
        );
    }
}