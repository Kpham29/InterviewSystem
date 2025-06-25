package fsa.training.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "[user]")
public class User {
    @Id
    private Integer userId;

    @OneToOne @MapsId @JoinColumn(name = "userId")
    private Account account;
    private String fullName;
    private String gender;
    private LocalDate dob;
    private String phone;
    private String address;
}
