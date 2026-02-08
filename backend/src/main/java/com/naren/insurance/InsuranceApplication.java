package com.naren.insurance;

import com.naren.insurance.model.Admin;
import com.naren.insurance.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class InsuranceApplication {
    public static void main(String[] args) {
        SpringApplication.run(InsuranceApplication.class, args);
    }

    @Configuration
    public static class AdminBootstrap {

        @Bean
        CommandLineRunner initAdmin(
                AdminRepository adminRepository,
                PasswordEncoder passwordEncoder
        ) {
            return args -> {
                if (adminRepository.count() == 0) {
                    Admin admin = Admin.builder()
                            .username("admin@gmail.com")
                            .password(passwordEncoder.encode("Admin@123"))
                            .role("ADMIN")
                            .build();

                    adminRepository.save(admin);
                    System.out.println("✔ Default admin created");
                }
            };
        }
    }
}
