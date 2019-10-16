package com.zemoso.OKR.objective;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ObjectiveRepository extends JpaRepository<Objective, UUID> {

    public List<Objective> findByOwnerIdAndDeleted(UUID id,Boolean deleted);

    public List<Objective> findByLevelAndDeleted(Integer id,Boolean deleted);

    public List<Objective> findAllByAndDeleted(Boolean deleted);

    public Optional<Objective> findByIdAndDeleted(UUID id, Boolean deleted);

    public Objective getOneByIdAndDeleted(UUID id,Boolean deleted);

    @Query("select o from Objective o where o.deleted=false and (o.ownerId = :ownerId or o.type = 'organization')")
    public List<Objective> filterObjectivesByValue(@Param("ownerId") UUID ownerId);

    @Query("select o from Objective o where o.level = :level and o.deleted=:deleted and o.type=:type")
    public List<Objective> findByLevelAndDeletedAndType(Integer level,Boolean deleted, String type);

    @Query("select o from Objective o where o.ownerId = :ownerId and o.level = :level and o.deleted=:deleted and o.type=:type")
    public List<Objective> getIndividualObjectives(@Param("ownerId") UUID ownerId,Integer level,Boolean deleted, String type);

    public List<Objective> findByObjectiveParentIdAndDeleted(UUID id, Boolean deleted);

}
