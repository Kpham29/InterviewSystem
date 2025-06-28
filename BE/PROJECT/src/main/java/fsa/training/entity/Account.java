package fsa.training.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    @Getter
    @Setter
    @Column(nullable = false, unique = true)
    private String username;

    @Setter
    @Getter
    @Column(nullable = false)
    private String password;

    @Getter
    @Setter
    @Column(nullable = false, unique = true)
    private String email;

    @Getter
    @Setter
    @ManyToOne @JoinColumn(name = "role_Id")
    private Role role;

    @Getter
    @Setter
    private Boolean isActive = true;

    @Getter
    @Setter
    private LocalDateTime createdAt;

    @Getter
    @Setter
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private User user;
}
