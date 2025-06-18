package fsa.training.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Job {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer jobId;

    private String title;

    @ManyToOne @JoinColumn(name = "createdBy")
    private Account createdBy;

    private String status;
    private LocalDateTime createdDate;

    @ManyToOne @JoinColumn(name = "updatedBy")
    private Account updatedBy;

    @OneToOne(mappedBy = "job", cascade = CascadeType.ALL)
    private JobSchedule schedule;

    @OneToOne(mappedBy = "job", cascade = CascadeType.ALL)
    private JobDetails details;
}
