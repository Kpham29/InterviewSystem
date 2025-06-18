package fsa.training.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Offer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer offerId;

    @ManyToOne @JoinColumn(name = "candidateId")
    private Candidate candidate;

    @ManyToOne @JoinColumn(name = "jobId")
    private Job job;

    @ManyToOne @JoinColumn(name = "createdBy")
    private Account createdBy;

    private String status;
    private String notes;
    private LocalDateTime createdDate;

    @ManyToOne @JoinColumn(name = "updatedBy")
    private Account updatedBy;
}
