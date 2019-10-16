package com.zemoso.OKR.user;

import java.util.Optional;

public class UserDTO {
    private String firstName;

    private String lastName;

    private String email;

    private Boolean isOrganization;

    private String designation;

    public Optional<String> getFirstName() {
        return Optional.ofNullable(firstName);
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Optional<String> getLastName() {
        return Optional.ofNullable(lastName);
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Optional<String> getEmail() {
        return Optional.ofNullable(email);
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Optional<Boolean> getIsOrganization() {
        return Optional.ofNullable(isOrganization);
    }

    public void setIsOrganization(Boolean organization) {
        isOrganization = organization;
    }

    public Optional<String> getDesignation() {
        return Optional.ofNullable(designation);
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}
