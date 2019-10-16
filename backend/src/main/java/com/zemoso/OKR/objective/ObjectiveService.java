package com.zemoso.OKR.objective;

import com.zemoso.OKR.exception.IncompleteFieldsException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ObjectiveService {

    public List<Objective> getAllObjectives() ;

    public List<Objective> getAllParentObjectives();

    public Objective getObjective(UUID id);

    public List<Objective> getObjectivesOfUser(UUID id);

    public Objective addObjective(ObjectiveDTO objectiveDTO) throws IncompleteFieldsException;

    public Objective updateObjective(ObjectiveDTO objectiveDTO, UUID id);

    public void deleteObjective(UUID id);

    public void deleteSubObjectives(UUID id);

    public Integer getObjectiveLevel(UUID id);

    public List<Objective> filterObjectives(UUID ownerId);

    public List<Objective> getOrganizationObjectives();

    public List<Objective> getIndividualObjectives(UUID id);
}
