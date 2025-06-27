package fsa.training.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
public class CandidateProfessional {
    @Id
    private Integer candidateId;

    @OneToOne @MapsId @JoinColumn(name = "candidateId")
    @Getter
    @Setter
    private Candidate candidate;

    @Getter
    @Setter
    private String currentPosition;
    @Getter
    @Setter
    private Integer yearsOfExperience;
    @Getter
    @Setter
    private String highestLevel;

    @ManyToMany
    @JoinTable(
            name = "candidate_skill",
            joinColumns = @JoinColumn(name = "candidate_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    @Getter
    @Setter
    private List<Skill> skills = new ArrayList<>();
}