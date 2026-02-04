package com.naren.insurance.controller;

import com.naren.insurance.dto.mapper.PolicyAssignmentMapper;
import com.naren.insurance.dto.request.PolicyAssignmentRequest;
import com.naren.insurance.dto.response.PolicyAssignmentResponse;
import com.naren.insurance.service.PolicyAssignmentService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class PolicyAssignmentController {

    private final PolicyAssignmentService assignmentService;

    public PolicyAssignmentController(PolicyAssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping
    public PolicyAssignmentResponse assignPolicy(
            @RequestBody PolicyAssignmentRequest request
    ) {
        return PolicyAssignmentMapper.toResponse(
                assignmentService.assignPolicy(
                        request.customerId(),
                        request.policyId(),
                        request.startDate()
                )
        );
    }

    @GetMapping
    public List<PolicyAssignmentResponse> getAllAssignments() {
        return assignmentService.getAllAssignments()
                .stream()
                .map(PolicyAssignmentMapper::toResponse)
                .toList();
    }

    @PutMapping("/{id}/terminate")
    public void terminateAssignment(
            @PathVariable Long id,
            @RequestParam LocalDate endDate
    ) {
        assignmentService.terminateAssignment(id, endDate);
    }
}