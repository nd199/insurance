package com.naren.insurance.service;

import com.naren.insurance.dto.mapper.AdminMapper;
import com.naren.insurance.dto.request.AdminCreateRequest;
import com.naren.insurance.dto.response.AdminResponse;
import com.naren.insurance.exception.BusinessRuleViolationException;
import com.naren.insurance.exception.ResourceNotFoundException;
import com.naren.insurance.model.Admin;
import com.naren.insurance.repository.AdminRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
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
        log.info("Creating admin with username: {}", request.username());
        if (adminRepository.existsByUsername(request.username())) {
            log.warn("Attempt to create duplicate admin: {}", request.username());
            throw new BusinessRuleViolationException("Admin already exists");
        }

        Admin admin = Admin.builder()
                .username(request.username())
                .password(passwordEncoder.encode(request.password()))
                .role(request.role())
                .build();

        Admin savedAdmin = adminRepository.save(admin);
        log.info("Admin created successfully: {}", savedAdmin.getId());
        return AdminMapper.toResponse(savedAdmin);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public AdminResponse getAdminById(Long id) {
        log.debug("Fetching admin with ID: {}", id);
        return adminRepository.findById(id)
                .map(AdminMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<AdminResponse> getAllAdmins() {
        log.debug("Fetching all admins");
        return adminRepository.findAll()
                .stream()
                .map(AdminMapper::toResponse)
                .toList();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteAdmin(Long id) {
        log.info("Deleting admin with ID: {}", id);
        if (!adminRepository.existsById(id)) {
            log.warn("Attempt to delete non-existent admin: {}", id);
            throw new ResourceNotFoundException("Admin not found");
        }
        adminRepository.deleteById(id);
        log.info("Admin deleted successfully: {}", id);
    }
}