package com.naren.insurance.service;

import com.naren.insurance.dto.mapper.AdminMapper;
import com.naren.insurance.dto.request.AdminCreateRequest;
import com.naren.insurance.dto.response.AdminResponse;
import com.naren.insurance.model.Admin;
import com.naren.insurance.repository.AdminRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminServiceImpl(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public AdminResponse createAdmin(AdminCreateRequest request) {
        if (adminRepository.existsByUsername(request.username())) {
            throw new IllegalArgumentException("Username already exists");
        }

        Admin admin = Admin.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .role(request.role())
                .build();

        return AdminMapper.toResponse(adminRepository.save(admin));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public AdminResponse getAdminById(Long id) {
        return adminRepository.findById(id)
                .map(AdminMapper::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found"));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<AdminResponse> getAllAdmins() {
        return adminRepository.findAll()
                .stream()
                .map(AdminMapper::toResponse)
                .toList();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}