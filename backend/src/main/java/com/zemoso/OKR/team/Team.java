package com.zemoso.OKR.team;

import com.zemoso.OKR.baseEntity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.CollectionTable;
import javax.persistence.JoinColumn;
import javax.persistence.ElementCollection;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Team extends BaseEntity{

    @Column(nullable = false)
    @NotBlank
    private String name;

    @Column
    @Type(type="org.hibernate.type.UUIDCharType")
    private UUID ownerId;

    @Column
    private String details;

    @Column
    @CollectionTable(name = "team_members", joinColumns = @JoinColumn(name = "team_id"))
    @ElementCollection
    @Type(type="org.hibernate.type.UUIDCharType")
    private List<UUID> memberIds=new ArrayList<>();

    public void addTeamMemberId(UUID id){
        memberIds.add(id);
    }

    public void clearTeamMembers(){
        memberIds.clear();
    }

}
