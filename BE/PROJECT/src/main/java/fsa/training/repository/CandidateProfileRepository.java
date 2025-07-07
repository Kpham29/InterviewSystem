package fsa.training.repository;

import fsa.training.entity.CandidateProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateProfileRepository extends JpaRepository<CandidateProfile, Integer> {
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}
