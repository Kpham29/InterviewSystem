package fsa.training.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Interview {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer interviewId;

    @ManyToOne @JoinColumn(name = "candidateId")
    private Candidate candidate;

    @ManyToOne @JoinColumn(name = "interviewerId")
    private Account interviewer;

    @ManyToOne @JoinColumn(name = "jobId")
    private Job job;

    private String interviewTitle;
    private LocalDateTime scheduleStart;
    private LocalDateTime scheduleEnd;
    private String result;
    private String status;
    private String notes;
}
