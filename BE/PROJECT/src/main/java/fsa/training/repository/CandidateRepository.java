package fsa.training.repository;

import fsa.training.entity.Candidate;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Integer> {

    @EntityGraph(attributePaths = {
            "profile", "professional", "professional.skills"
    })
    @Query("SELECT c FROM Candidate c " +
            "WHERE (:search IS NULL OR LOWER(c.profile.fullName) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:status IS NULL OR c.status = :status)")
    List<Candidate> searchCandidates(@Param("search") String search,
                                     @Param("status") String status);
}
