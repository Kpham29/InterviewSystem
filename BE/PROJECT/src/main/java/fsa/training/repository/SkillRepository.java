package fsa.training.repository;

import fsa.training.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Integer> {

    @Query("SELECT s FROM Skill s WHERE LOWER(s.name) = LOWER(:name)")
    Optional<Skill> findByName(@Param("name") String name);
}
