package com.zemoso.OKR.team;

import com.zemoso.OKR.objective.Objective;
import com.zemoso.OKR.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TeamRepository extends JpaRepository<Team, UUID> {

    public Team getOneByIdAndDeleted(UUID id,Boolean deleted);

    public Optional<Team> findByIdAndDeleted(UUID id,  Boolean deleted);

    public List<Team> findAllByDeleted(Boolean deleted);

    @Query("select o from Objective o where o.ownerId in (select m from Team t join t.memberIds m where t.id = :id and t.deleted='false') and o.type=concat('team',:id) and o.deleted='false' and o.level=0")
    public List<Objective> getTeamObjectives(@Param("id") UUID id);

    @Query("select u from User u where u.id in (select m from Team t join t.memberIds m where t.id = :id and t.deleted='false') and u.deleted='false'")
    public List<User> getTeamMembers(@Param("id") UUID id);

}
