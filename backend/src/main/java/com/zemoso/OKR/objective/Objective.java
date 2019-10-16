package com.zemoso.OKR.objective;

import com.zemoso.OKR.baseEntity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Objective extends BaseEntity {

    @Column(nullable = false)
    @NotBlank
    private String title;

    @Column
    private String description;

    @Type(type="org.hibernate.type.UUIDCharType")
    @Column(name = "owner_id",nullable = false)
    private UUID ownerId;

    @Column
    private String ownerName;

    @Column
    private String type;

    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @Column
    private Integer percentageCompleted = 0;

    @Column
    private String status;

    @Type(type="org.hibernate.type.UUIDCharType")
    @Column(name = "objective_parent_id")
    private UUID objectiveParentId;

    @Column
    private Integer level;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "objective_parent_id", referencedColumnName = "id")
    private List<Objective> subObjective;

}
