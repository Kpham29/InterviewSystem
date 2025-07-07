package fsa.training.controller;

import fsa.training.dto.CandidateDto;
import fsa.training.entity.Candidate;
import fsa.training.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @GetMapping("/candidate-list")
    public ResponseEntity<Page<CandidateDto>> getAllCandidates(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<CandidateDto> result = candidateService.getCandidates(keyword, status, page, size);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/candidate-create")
    public ResponseEntity<CandidateDto> createCandidate(@Valid @RequestBody CandidateDto candidateDto) {
        Candidate created = candidateService.createCandidate(candidateDto);
        CandidateDto responseDto = candidateService.convertToDto(created);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }
}
