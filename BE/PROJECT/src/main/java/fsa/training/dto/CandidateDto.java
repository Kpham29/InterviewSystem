package fsa.training.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CandidateDto {
    private Integer id;
    private String status;
    private String note;
    private LocalDateTime createdDate;

    private Integer recruiterId;
    private String recruiter;

    private Integer lastUpdatedBy;

    // Profile
    private String fullName;
    private String email;
    private String phone;
    private String gender;
    private LocalDate dob;
    private String address;
    private String cvFilePath;

    // Professional
    private String currentPosition;
    private Integer yearsOfExperience;
    private String highestLevel;

    private List<String> skills;
}
