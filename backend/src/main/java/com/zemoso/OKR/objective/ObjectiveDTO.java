package com.zemoso.OKR.objective;


import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

public class ObjectiveDTO {

    private String title;

    private String description;

    private UUID ownerId;

    private String type;

    private LocalDate startDate;

    private  LocalDate endDate;

    private Integer percentageCompleted;

    private String status;

    private UUID objectiveParentId;

    private UUID createdBy;

    private UUID updatedBy;

    public Optional<String> getTitle() {
        return Optional.ofNullable(title);
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Optional<String> getDescription() {
        return Optional.ofNullable(description);
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Optional<UUID> getOwnerId() {
        return Optional.ofNullable(ownerId);
    }

    public void setOwnerId(UUID ownerId) {
        this.ownerId = ownerId;
    }

    public Optional<String> getType() {
        return Optional.ofNullable(type);
    }

    public void setType(String type) {
        this.type = type;
    }

    public Optional<LocalDate> getStartDate() {
        return Optional.ofNullable(startDate);
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public Optional<LocalDate> getEndDate() {
        return Optional.ofNullable(endDate);
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Optional<Integer> getPercentageCompleted() {
        return Optional.ofNullable(percentageCompleted);
    }

    public void setPercentageCompleted(Integer percentageCompleted) {
        this.percentageCompleted = percentageCompleted;
    }

    public Optional<String> getStatus() {
        return Optional.ofNullable(status);
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Optional<UUID> getObjectiveParentId() {
        return Optional.ofNullable(objectiveParentId);
    }

    public void setObjectiveParentId(UUID objectiveParentId) {
        this.objectiveParentId = objectiveParentId;
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
