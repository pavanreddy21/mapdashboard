package com.zemoso.OKR.team;

import com.zemoso.OKR.objective.Objective;
import com.zemoso.OKR.objective.ObjectiveController;
import com.zemoso.OKR.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "*")
public class TeamController {
    private Logger logger = Logger.getLogger(ObjectiveController.class.getName());

    private TeamService fTeamService;

    @Autowired
    public TeamController(final TeamService teamService){
        fTeamService=teamService;

    }

    @GetMapping(value="/teams")
    public ResponseEntity<Iterable<Team>> getAllTeams(){
            return new ResponseEntity<>(fTeamService.getAllTeams(), HttpStatus.OK);
    }

    @GetMapping(value = "/teamObjectives/{teamId}")
    public ResponseEntity<Iterable<Objective>> getTeamsObjectives(@PathVariable UUID teamId){
            return new ResponseEntity<>(fTeamService.getTeamObjectives(teamId),HttpStatus.OK);
    }

    @GetMapping(value = "/teamMembers/{teamId}")
    public ResponseEntity<Iterable<User>> getTeamsMembers(@PathVariable UUID teamId) throws Exception {
            return new ResponseEntity<>(fTeamService.getTeamMembers(teamId),HttpStatus.OK);
    }


    @GetMapping(value="/team/{id}")
    public ResponseEntity<Team> getTeams(@PathVariable UUID id){
            return new ResponseEntity<>(fTeamService.getTeam(id), HttpStatus.OK);
    }


    @PostMapping(value="/teams")
    public ResponseEntity<Team> addTeam(@RequestBody TeamDTO teamDTO){
            return new ResponseEntity<>(fTeamService.addTeam(teamDTO), HttpStatus.OK);
    }

    @PutMapping(value="/teams/{id}")
    public ResponseEntity<Team> updateTeam(@RequestBody TeamDTO teamDTO,@PathVariable UUID id){
            return new ResponseEntity<>(fTeamService.updateTeam(id,teamDTO), HttpStatus.OK);
    }

    @DeleteMapping(value="/teams/{id}")
    public ResponseEntity<String> deleteTeam(@PathVariable UUID id) throws Exception {
            fTeamService.deleteTeam(id);
            return new ResponseEntity<>("Team marked as deleted", HttpStatus.ACCEPTED);
    }

}
