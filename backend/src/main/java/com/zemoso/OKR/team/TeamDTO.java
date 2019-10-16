package com.zemoso.OKR.team;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class TeamDTO {
    private String name;

    private UUID ownerId;

    private String details;

    private List<UUID> members;

    private UUID createdBy;

    private  UUID updatedBy;

    public Optional<String> getName() {
        return Optional.ofNullable(name);
    }

    public void setName(String name) {
        this.name = name;
    }

    public Optional<UUID> getOwnerId() {
        return Optional.ofNullable(ownerId);
    }

    public void setOwnerId(UUID ownerId) {
        this.ownerId = ownerId;
    }

    public Optional<String> getDetails() {
        return Optional.ofNullable(details);
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Optional<List<UUID>> getMembers() {
        return Optional.ofNullable(members);
    }

    public void setMembers(List<UUID> members) {
        this.members = members;
    }

    public Optional<UUID> getCreatedBy() {
        return Optional.ofNullable(createdBy);
    }

    public void setCreatedBy(UUID createdBy) {
        this.createdBy = createdBy;
    }

    public Optional<UUID> getUpdatedBy() {
        return Optional.ofNullable(updatedBy);
    }

    public void setUpdatedBy(UUID updatedBy) {
        this.updatedBy = updatedBy;
    }
}
