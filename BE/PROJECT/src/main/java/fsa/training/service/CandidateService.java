package fsa.training.service;

import fsa.training.dto.CandidateDto;
import fsa.training.entity.*;
import fsa.training.repository.AccountRepository;
import fsa.training.repository.CandidateProfileRepository;
import fsa.training.repository.CandidateRepository;
import fsa.training.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CandidateProfileRepository candidateProfileRepository;


    public Page<CandidateDto> getCandidates(String keyword, String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());

        Page<Candidate> candidates = candidateRepository.searchCandidates(
                keyword == null || keyword.trim().isEmpty() ? null : keyword.trim(),
                status == null || status.trim().isEmpty() ? null : status.trim(),
                pageable
        );

        List<CandidateDto> dtos = candidates.map(this::convertToDto).toList();

        return new PageImpl<>(dtos, pageable, candidates.getTotalElements());
    }

    public CandidateDto convertToDto(Candidate c) {
        CandidateDto dto = new CandidateDto();
        dto.setId(c.getCandidateId());
        dto.setStatus(c.getStatus());
        dto.setNote(c.getNote());
        dto.setCreatedDate(c.getCreatedDate());

        if (c.getRecruiter() != null) {
            dto.setRecruiterId(c.getRecruiter().getUserId());
            dto.setRecruiter(c.getRecruiter().getUsername());
        }
        if (c.getLastUpdatedBy() != null) {
            dto.setLastUpdatedBy(c.getLastUpdatedBy().getUserId());
        }

        if (c.getProfile() != null) {
            CandidateProfile p = c.getProfile();
            dto.setFullName(p.getFullName());
            dto.setEmail(p.getEmail());
            dto.setPhone(p.getPhone());
            dto.setDob(p.getDob());
            dto.setAddress(p.getAddress());
            dto.setGender(p.getGender());
            dto.setCvFilePath(p.getCvFilePath());
        }

        if (c.getProfessional() != null) {
            CandidateProfessional prof = c.getProfessional();
            dto.setCurrentPosition(prof.getCurrentPosition());
            dto.setHighestLevel(prof.getHighestLevel());
            dto.setYearsOfExperience(prof.getYearsOfExperience());

            List<String> skillNames = new ArrayList<>();
            for (Skill s : prof.getSkills()) {
                skillNames.add(s.getName());
            }
            dto.setSkills(skillNames);
        }

        return dto;
    }

    public Candidate createCandidate(CandidateDto dto) {
        if (candidateProfileRepository.existsByEmail(dto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email đã tồn tại trong hệ thống.");
        }

        if (candidateProfileRepository.existsByPhone(dto.getPhone())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Số điện thoại đã tồn tại trong hệ thống.");
        }


        Candidate candidate = new Candidate();
        candidate.setStatus(dto.getStatus());
        candidate.setNote(dto.getNote());
        candidate.setCreatedDate(LocalDateTime.now());

        if (dto.getRecruiterId() != null) {
            Account recruiter = accountRepository.findById(dto.getRecruiterId())
                    .orElseThrow(() -> new RuntimeException("Recruiter not found"));
            candidate.setRecruiter(recruiter);
        }

        if (dto.getLastUpdatedBy() != null) {
            Account updater = accountRepository.findById(dto.getLastUpdatedBy())
                    .orElse(null);
            candidate.setLastUpdatedBy(updater);
        }

        CandidateProfile profile = new CandidateProfile();
        profile.setCandidate(candidate);
        profile.setFullName(dto.getFullName());
        profile.setEmail(dto.getEmail());
        profile.setPhone(dto.getPhone());
        profile.setDob(dto.getDob());
        profile.setAddress(dto.getAddress());
        profile.setGender(dto.getGender());
        profile.setCvFilePath(dto.getCvFilePath());
        candidate.setProfile(profile);

        CandidateProfessional prof = new CandidateProfessional();
        prof.setCandidate(candidate);
        prof.setCurrentPosition(dto.getCurrentPosition());
        prof.setHighestLevel(dto.getHighestLevel());
        prof.setYearsOfExperience(dto.getYearsOfExperience());

        List<Skill> skills = new ArrayList<>();
        for (String skillName : dto.getSkills()) {
            Skill skill = skillRepository.findByName(skillName)
                    .orElseGet(() -> {
                        Skill s = new Skill();
                        s.setName(skillName);
                        return skillRepository.save(s);
                    });
            skills.add(skill);
        }
        prof.setSkills(skills);
        candidate.setProfessional(prof);

        return candidateRepository.save(candidate);
    }
}
