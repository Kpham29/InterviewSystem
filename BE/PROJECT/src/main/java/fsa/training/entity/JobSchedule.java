package fsa.training.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class JobSchedule {
    @Id
    private Integer jobId;

    @OneToOne @MapsId @JoinColumn(name = "jobId")
    private Job job;

    private LocalDate startDate;
    private LocalDate endDate;
    private Integer salaryFrom;
    private Integer salaryTo;
}
