package fsa.training.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Candidate {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Integer candidateId;

    @ManyToOne @JoinColumn(name = "recruiterId")
    @Getter
    @Setter
    private Account recruiter;
    @Getter
    @Setter
    private String status;
    @Getter
    @Setter
    private String note;
    @Getter
    @Setter
    private LocalDateTime createdDate;

    @ManyToOne @JoinColumn(name = "lastUpdatedBy")
    private Account lastUpdatedBy;

    @Setter
    @Getter
    @OneToOne(mappedBy = "candidate", cascade = CascadeType.ALL)
    private CandidateProfile profile;

    @Setter
    @Getter
    @OneToOne(mappedBy = "candidate", cascade = CascadeType.ALL)
    private CandidateProfessional professional;

}