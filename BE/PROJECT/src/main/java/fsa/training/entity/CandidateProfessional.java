package fsa.training.entity;

import jakarta.persistence.*;

@Entity
public class CandidateProfessional {
    @Id
    private Integer candidateId;

    @OneToOne @MapsId @JoinColumn(name = "candidateId")
    private Candidate candidate;

    private String currentPosition;
    private String skills;
    private Integer yearsOfExperience;
    private String highestLevel;
}
