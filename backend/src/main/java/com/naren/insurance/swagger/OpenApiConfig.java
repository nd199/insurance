package com.naren.insurance.swagger;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Insurance Policy Management API",
                version = "1.0",
                description = "Enterprise-grade insurance backend"
        ),
        security = @SecurityRequirement(name = "bearerAuth")
)
public class OpenApiConfig {
}