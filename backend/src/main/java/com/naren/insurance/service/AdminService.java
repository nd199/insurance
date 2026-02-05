package com.naren.insurance.service;

import com.naren.insurance.dto.request.AdminCreateRequest;
import com.naren.insurance.dto.response.AdminResponse;

import java.util.List;

public interface AdminService {
    AdminResponse createAdmin(AdminCreateRequest request);

    AdminResponse getAdminById(Long id);

    List<AdminResponse> getAllAdmins();

    void deleteAdmin(Long id);
}