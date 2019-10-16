package com.zemoso.OKR.user;

import com.zemoso.OKR.baseEntity.BaseEntity;
import com.zemoso.OKR.objective.Objective;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
public class User extends BaseEntity {

    @Column(nullable = false)
    @NotBlank
    private String firstName;

    @Column(nullable = false)
    @NotBlank
    private String lastName;

    @Column(unique = true,nullable = false)
    @NotBlank
    private String email;

    @Column
    private String designation;

    @Column
    private Boolean isOrganization = false;

    @Lob
    @Column(name = "profileImage")
    private byte[] profileImage;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private List<Objective> objective;

}