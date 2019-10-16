package com.zemoso.OKR.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    public List<User> findAllByDeleted(Boolean deleted);

    public Optional<User> findByIdAndDeleted(UUID id,  Boolean deleted);

    public User getOneByIdAndDeleted(UUID id, Boolean deleted);

    Boolean existsByEmail(String email);
}
