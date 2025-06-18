package fsa.training.entity;

import jakarta.persistence.*;

@Entity
public class JobDetails {
    @Id
    private Integer jobId;

    @OneToOne @MapsId @JoinColumn(name = "jobId")
    private Job job;

    private String skills;
    private String level;
    private String workingAddress;
    private String benefits;
    private String description;
}
