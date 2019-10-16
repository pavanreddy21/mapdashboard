package com.zemoso.OKR.objective;

import com.zemoso.OKR.exception.BadRequestException;
import com.zemoso.OKR.exception.IncompleteFieldsException;
import com.zemoso.OKR.user.User;
import com.zemoso.OKR.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class ObjectiveServiceImpl implements ObjectiveService {


    private ObjectiveRepository fObjectiveRepository;
    private UserService fUserService;


    @Autowired
    public ObjectiveServiceImpl(final ObjectiveRepository objectiveRepository,final UserService userService){
        fObjectiveRepository = objectiveRepository;
        fUserService=userService;
    }

    public List<Objective> getAllObjectives() {

        return fObjectiveRepository.findAllByAndDeleted(false);
    }

    public List<Objective> getAllParentObjectives(){

        return fObjectiveRepository.findByLevelAndDeleted(0,false);
    }

    public List<Objective> getOrganizationObjectives(){
        return fObjectiveRepository.findByLevelAndDeletedAndType(0,false, "organization");
    }

    public List<Objective> getIndividualObjectives(UUID id){
        User user=fUserService.getUser(id);
        return fObjectiveRepository.getIndividualObjectives(id,0,false, "individual");
    }

    public Objective getObjective(UUID id) {
        Objective objective=fObjectiveRepository.findByIdAndDeleted(id,false).orElseThrow(()->
            new BadRequestException("Objective does not exist")
        );
        return objective;
    }

    public List<Objective> getObjectivesOfUser(UUID id) {
        User user=fUserService.getUser(id);
        return fObjectiveRepository.findByOwnerIdAndDeleted(id,false);
    }

    public Objective addObjective(final ObjectiveDTO objectiveDTO) throws IncompleteFieldsException{

        Objective objective = new Objective();

        if(objectiveDTO.getTitle().isPresent()) {
            String title = objectiveDTO.getTitle().get();
            objective.setTitle(title);
        }
        else{
            throw new IncompleteFieldsException("All required fields of objective not set");
        }


        objectiveDTO.getDescription().ifPresent(description->{
            objective.setDescription(description);
        });

        if(objectiveDTO.getOwnerId().isPresent()) {
            UUID ownerId = objectiveDTO.getOwnerId().get();
            User owner = fUserService.getUser(ownerId);
            objective.setOwnerId(ownerId);
            objective.setOwnerName(owner.getFirstName()+" " +owner.getLastName());

        }
        else{
            throw new IncompleteFieldsException("All required fields of objective not set");
        }
        if(objectiveDTO.getType().isPresent()) {
            String type = objectiveDTO.getType().get();
            objective.setType(type);
        }
        else{
            throw new IncompleteFieldsException("All required fields of objective not set");
        }
        objectiveDTO.getStartDate().ifPresent(startDate->{
            objective.setStartDate(startDate);
        });

        objectiveDTO.getEndDate().ifPresent(endDate->{
            objective.setEndDate(endDate);
        });

        objectiveDTO.getPercentageCompleted().ifPresent(percentageCompleted->{
            objective.setPercentageCompleted(percentageCompleted);
        });

        objectiveDTO.getStatus().ifPresent(status->{
            objective.setStatus(status);
        });

        if(objectiveDTO.getObjectiveParentId().isPresent()){
            UUID objectiveParentId=objectiveDTO.getObjectiveParentId().get();
                Objective parentObjective=this.getObjective(objectiveParentId);

                objective.setObjectiveParentId(objectiveParentId);
                UUID id = objective.getObjectiveParentId();
                int parentLevel = this.getObjectiveLevel(id);
                objective.setLevel(parentLevel + 1);
        }
        else{
            objective.setLevel(0);
        }
        if(objectiveDTO.getCreatedBy().isPresent()) {
            UUID createdBy = objectiveDTO.getCreatedBy().get();
            objective.setCreatedBy(createdBy);
            objective.setUpdatedBy(createdBy);
        }
        else{
            throw new IncompleteFieldsException("All required fields of objective not set");
        }

        return fObjectiveRepository.save(objective);
    }

    public Objective updateObjective(ObjectiveDTO objectiveDTO, UUID id) {
        Objective objective = fObjectiveRepository.getOneByIdAndDeleted(id,false);

        objectiveDTO.getTitle().ifPresent(title->{
            objective.setTitle(title);
        });

        objectiveDTO.getDescription().ifPresent(description->{
            objective.setDescription(description);
        });


        objectiveDTO.getOwnerId().ifPresent(ownerId->{
            User owner=fUserService.getUser(ownerId);
            objective.setOwnerId(ownerId);
            objective.setOwnerName(owner.getFirstName()+" " +owner.getLastName());
        });


        objectiveDTO.getType().ifPresent(type->{
            objective.setType(type);
        });

        objectiveDTO.getStartDate().ifPresent(startDate->{
            objective.setStartDate(startDate);
        });

        objectiveDTO.getEndDate().ifPresent(endDate->{
            objective.setEndDate(endDate);
        });

        objectiveDTO.getPercentageCompleted().ifPresent(percentageCompleted->{
            objective.setPercentageCompleted(percentageCompleted);
        });


        objectiveDTO.getStatus().ifPresent(status->{
            objective.setStatus(status);
        });

        objectiveDTO.getObjectiveParentId().ifPresent(objectiveParentId->{
            Objective parentObjective=this.getObjective(objectiveParentId);

            objective.setObjectiveParentId(objectiveParentId);
            UUID pid = objective.getObjectiveParentId();
            int parentLevel = this.getObjectiveLevel(pid);
            objective.setLevel(parentLevel + 1);
        });

        if(objectiveDTO.getUpdatedBy().isPresent()) {
            UUID updatedBy = objectiveDTO.getUpdatedBy().get();
            objective.setCreatedBy(updatedBy);
        }
        else{
            throw new IncompleteFieldsException("All required fields of objective not set");
        }

        return fObjectiveRepository.save(objective);
    }

    public void deleteObjective(UUID id) {
        this.deleteSubObjectives(id);
        Objective objective=fObjectiveRepository.getOneByIdAndDeleted(id,false);
        if(Objects.isNull(objective)){
            throw new BadRequestException("Objective does not exist with given Id");
        }
        objective.setDeleted(true);
        fObjectiveRepository.save(objective);
    }

    public void deleteSubObjectives(UUID id){
        List<Objective> subobjectives=fObjectiveRepository.findByObjectiveParentIdAndDeleted(id,false);
        for(Objective objective:subobjectives){
            this.deleteObjective(objective.getId());
        }
    }

    public Integer getObjectiveLevel(UUID id) {
        Optional<Objective> foundObjective = fObjectiveRepository.findByIdAndDeleted(id,false);
        Objective currentObjective = foundObjective.get();
        return currentObjective.getLevel();
    }

    public List<Objective> filterObjectives(UUID ownerId){
        User owner=fUserService.getUser(ownerId);
        return fObjectiveRepository.filterObjectivesByValue( ownerId);
    }
}
