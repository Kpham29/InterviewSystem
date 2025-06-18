package fsa.training.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class CandidateProfile {
    @Id
    private Integer candidateId;

    @OneToOne @MapsId @JoinColumn(name = "candidateId")
    private Candidate candidate;

    private String fullName;
    private String email;
    private String gender;
    private LocalDate dob;
    private String address;
    private String phone;
    private String cvFilePath;
}
