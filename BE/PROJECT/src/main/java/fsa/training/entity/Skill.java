package fsa.training.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Skill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Getter
    @Setter
    private String name;

    @ManyToMany(mappedBy = "skills")
    @Getter
    @Setter
    private List<CandidateProfessional> candidateProfessionals = new ArrayList<>();

}