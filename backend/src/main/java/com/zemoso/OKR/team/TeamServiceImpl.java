package com.zemoso.OKR.team;

import com.zemoso.OKR.exception.BadRequestException;
import com.zemoso.OKR.exception.IncompleteFieldsException;
import com.zemoso.OKR.objective.Objective;
import com.zemoso.OKR.objective.ObjectiveService;
import com.zemoso.OKR.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service

public class TeamServiceImpl implements TeamService{


    private TeamRepository fTeamRepository;

    private ObjectiveService fObjectiveService;

    @Autowired
    public TeamServiceImpl(final  TeamRepository teamRepository,final ObjectiveService objectiveService){

        fTeamRepository=teamRepository;
        fObjectiveService=objectiveService;
    }

    @Override
    public List<Team> getAllTeams() {
        return fTeamRepository.findAllByDeleted(false);
    }

    @Override
    public Team getTeam(UUID id) {
        Team team=fTeamRepository.findByIdAndDeleted(id,false).orElseThrow(()->
                new BadRequestException("Team does not exist")
                );

        return team;
    }

    @Override
    public List<Objective> getTeamObjectives(UUID id){
        Team team=fTeamRepository.findByIdAndDeleted(id,false).orElseThrow(()->
                new BadRequestException("Team does not exist")
                );
        return fTeamRepository.getTeamObjectives(id);
    }

    @Override
    public List<User> getTeamMembers(UUID id){
        Team team=fTeamRepository.findByIdAndDeleted(id,false).orElseThrow(()->
                new BadRequestException("Team does not exist")
                );
        return  fTeamRepository.getTeamMembers(id);
    }

    @Override
    public Team deleteTeam(UUID id) {
        Team team=fTeamRepository.getOneByIdAndDeleted(id,false);
        if(Objects.isNull(team)){
            throw new BadRequestException("Team Id is invalid");
        }
        List<Objective> teamObjectives=this.getTeamObjectives(id);
        for(Objective objective:teamObjectives){
            fObjectiveService.deleteObjective(objective.getId());
        }
        team.setDeleted(true);
        return fTeamRepository.save(team);
    }

    @Override
    public Team addTeam(TeamDTO teamDTO) throws IncompleteFieldsException{
        Team team = new Team();
        if(teamDTO.getName().isPresent()) {
            String name = teamDTO.getName().get();
            team.setName(name);
        }
        else{
            throw new IncompleteFieldsException("All required fields of team not set");
        }

        if(teamDTO.getOwnerId().isPresent()) {
            UUID ownerId = teamDTO.getOwnerId().get();
            team.setOwnerId(ownerId);
            team.addTeamMemberId(ownerId);
        }
        else {
            throw new IncompleteFieldsException("All required fields of team not set");
        }

        teamDTO.getDetails().ifPresent(details->{
            team.setDetails(details);
        });


        teamDTO.getMembers().ifPresent(members->{
            for(UUID memberId:members){
                team.addTeamMemberId(memberId);
            }
        });

        if(teamDTO.getCreatedBy().isPresent()) {
            UUID createdBy = teamDTO.getCreatedBy().get();
            team.setCreatedBy(createdBy);
            team.setUpdatedBy(createdBy);
        }
        else{
            throw new IncompleteFieldsException("All required fields of Team not set");
        }

        return fTeamRepository.save(team);
    }

    @Override
    public Team updateTeam(UUID id, TeamDTO teamDTO) {
        Team team = fTeamRepository.getOneByIdAndDeleted(id,false);

        if(Objects.isNull(team)){
            throw new BadRequestException("Team Id is Invalid");
        }

        teamDTO.getName().ifPresent(name->{
            team.setName(name);
        });

        teamDTO.getOwnerId().ifPresent(ownerId->{
            team.setOwnerId(ownerId);
        });

        teamDTO.getOwnerId().ifPresent(ownerId->{
            team.setOwnerId(ownerId);
        });

        teamDTO.getDetails().ifPresent(details->{
            team.setDetails(details);
        });

        team.clearTeamMembers();
        teamDTO.getMembers().ifPresent(members->{
            team.setMemberIds(members);
        });

        team.addTeamMemberId(teamDTO.getOwnerId().get());

        if(teamDTO.getUpdatedBy().isPresent()) {
            UUID createdBy = teamDTO.getCreatedBy().get();
            team.setCreatedBy(createdBy);
            team.setUpdatedBy(createdBy);
        }
        else{
            throw new IncompleteFieldsException("All required fields of Team not set");
        }

        return fTeamRepository.save(team);
    }
}
