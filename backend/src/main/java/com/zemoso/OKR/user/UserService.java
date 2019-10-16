package com.zemoso.OKR.user;

import com.zemoso.OKR.exception.IncompleteFieldsException;

import java.util.List;
import java.util.UUID;

public interface UserService {
    public List<User> getAllUsers();

    public User getUser(UUID id);

    public User addUser(UserDTO userDTO) throws IncompleteFieldsException;

    public User updateUser(UUID id, UserDTO userDTO);

    public User deleteUser(UUID id);
}
