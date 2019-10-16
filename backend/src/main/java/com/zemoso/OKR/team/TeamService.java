package com.zemoso.OKR.team;

import com.zemoso.OKR.exception.IncompleteFieldsException;
import com.zemoso.OKR.objective.Objective;
import com.zemoso.OKR.user.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TeamService {
    public List<Team> getAllTeams();

    public Team deleteTeam(UUID id);

    public Team updateTeam(UUID id, TeamDTO teamDTO);

    public Team addTeam(TeamDTO teamDTO) throws IncompleteFieldsException;

    public Team getTeam(UUID id);

    public List<Objective> getTeamObjectives(UUID id);

    public List<User> getTeamMembers(UUID id);
}
