package com.zemoso.OKR.objective;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "*")
public class ObjectiveController {
    private Logger logger = Logger.getLogger(ObjectiveController.class.getName());

    private ObjectiveService fObjectiveService;

    @Autowired
    public ObjectiveController(final  ObjectiveService objectiveService){
        fObjectiveService=objectiveService;
    }

    @GetMapping(value = "/objectives")
    public ResponseEntity<Iterable<Objective>> getAllObjectives()  {
        return new ResponseEntity<>(fObjectiveService.getAllParentObjectives(), HttpStatus.OK);
    }

    @GetMapping(value="/objectives/organization")
    public ResponseEntity<Iterable<Objective>> getOrganizationObjectives() throws Exception {
            return new ResponseEntity<>(fObjectiveService.getOrganizationObjectives(), HttpStatus.OK);
    }

    @GetMapping(value="/objectives/individual/{id}")
    public ResponseEntity<Iterable<Objective>> getIndividualObjectives(@PathVariable UUID id) {
            return new ResponseEntity<>(fObjectiveService.getIndividualObjectives(id), HttpStatus.OK);
    }

    @GetMapping(value = "/objectives/{id}")
    public ResponseEntity<Objective> getObjective(@PathVariable UUID  id) {
            return new ResponseEntity<>(fObjectiveService.getObjective(id), HttpStatus.OK);
    }

    @GetMapping(value = "/objectivesOfUser/{id}")
    public ResponseEntity<Iterable<Objective>> getObjectivesOfUser(@PathVariable UUID id){
            return new ResponseEntity<>(fObjectiveService.getObjectivesOfUser(id), HttpStatus.OK);
    }

    @PostMapping(value = "/objectives")
    public ResponseEntity<Objective> addObjective(@RequestBody final ObjectiveDTO objectiveDTO) {
            return new ResponseEntity<>(fObjectiveService.addObjective(objectiveDTO), HttpStatus.OK);
    }

    @PutMapping(value = "/objectives/{id}")
    public void updateObjective(@RequestBody final ObjectiveDTO objectiveDTO, @PathVariable UUID id) {
            fObjectiveService.updateObjective(objectiveDTO, id);
    }

    @DeleteMapping(value = "/objectives/{id}")
    public void deleteObjective(@PathVariable UUID id) throws  Exception {
            fObjectiveService.deleteObjective(id);
    }

    @GetMapping(value = "/searchObjectives/{ownerId}")
    public ResponseEntity<Iterable<Objective>> filterObjectives(@PathVariable UUID ownerId) throws Exception {
            return new ResponseEntity<>(fObjectiveService.filterObjectives(ownerId), HttpStatus.OK);
    }
}
