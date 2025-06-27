package fsa.training.service;

import fsa.training.dto.CandidateDto;
import fsa.training.entity.*;
import fsa.training.repository.AccountRepository;
import fsa.training.repository.CandidateRepository;
import fsa.training.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    // Lấy danh sách ứng viên (GET)
    public List<CandidateDto> getCandidates(String keyword, String status) {
        List<Candidate> candidates = candidateRepository.searchCandidates(
                keyword == null || keyword.trim().isEmpty() ? null : keyword.trim(),
                status == null || status.trim().isEmpty() ? null : status.trim()
        );

        List<CandidateDto> dtos = new ArrayList<>();
        for (Candidate c : candidates) {
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

            dtos.add(dto);
        }

        return dtos;
    }

    // Tạo ứng viên mới (POST)
    public Candidate createCandidate(CandidateDto dto) {
        Candidate candidate = new Candidate();
        candidate.setStatus(dto.getStatus());
        candidate.setNote(dto.getNote());
        candidate.setCreatedDate(LocalDateTime.now());

        // Gán recruiter
        if (dto.getRecruiterId() != null) {
            Account recruiter = accountRepository.findById(dto.getRecruiterId())
                    .orElseThrow(() -> new RuntimeException("Recruiter not found"));
            candidate.setRecruiter(recruiter);
        }

        // Gán người cập nhật cuối (nếu có)
        if (dto.getLastUpdatedBy() != null) {
            Account updater = accountRepository.findById(dto.getLastUpdatedBy())
                    .orElse(null);
            candidate.setLastUpdatedBy(updater);
        }

        // Gán profile
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

        // Gán professional
        CandidateProfessional prof = new CandidateProfessional();
        prof.setCandidate(candidate);
        prof.setCurrentPosition(dto.getCurrentPosition());
        prof.setHighestLevel(dto.getHighestLevel());
        prof.setYearsOfExperience(dto.getYearsOfExperience());

        // Gán kỹ năng
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
