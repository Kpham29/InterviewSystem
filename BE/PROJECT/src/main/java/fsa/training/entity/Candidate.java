package fsa.training.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Candidate {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer candidateId;

    @ManyToOne @JoinColumn(name = "recruiterId")
    private Account recruiter;

    private String status;
    private String note;
    private LocalDateTime createdDate;

    @ManyToOne @JoinColumn(name = "lastUpdatedBy")
    private Account lastUpdatedBy;

    @OneToOne(mappedBy = "candidate", cascade = CascadeType.ALL)
    private CandidateProfile profile;

    @OneToOne(mappedBy = "candidate", cascade = CascadeType.ALL)
    private CandidateProfessional professional;
}
