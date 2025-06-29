package fsa.training.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
public class CandidateProfile {
    @Id
    private Integer candidateId;

    @OneToOne @MapsId @JoinColumn(name = "candidateId")
    @Getter
    @Setter
    private Candidate candidate;
    @Getter
    @Setter
    private String fullName;
    @Getter
    @Setter
    private String email;
    @Getter
    @Setter
    private String gender;
    @Getter
    @Setter
    private LocalDate dob;
    @Getter
    @Setter
    private String address;
    @Getter
    @Setter
    private String phone;
    @Getter
    @Setter
    private String cvFilePath;
}