package fsa.training.controller;

import fsa.training.dto.CandidateDto;
import fsa.training.entity.Candidate;
import fsa.training.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @GetMapping("/candidate-list")
    public List<CandidateDto> getAllCandidates(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String status
    ) {
        return candidateService.getCandidates(keyword, status);
    }

    @PostMapping("/candidate-create")
    public Candidate createCandidate(@RequestBody CandidateDto candidateDto) {
        return candidateService.createCandidate(candidateDto);
    }
}
