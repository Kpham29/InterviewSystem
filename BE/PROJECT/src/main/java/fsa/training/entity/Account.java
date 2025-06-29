package fsa.training.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private int userId;
    @Getter
    @Setter
    @Column(nullable = false, unique = true)
    private String username;

    @Setter
    @Getter
    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Getter
    @Setter
    @ManyToOne @JoinColumn(name = "roleId")
    private Role role;

    private Boolean isActive = true;

    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private User user;
}
