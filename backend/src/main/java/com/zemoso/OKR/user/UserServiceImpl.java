package com.zemoso.OKR.user;


import com.zemoso.OKR.exception.IncompleteFieldsException;
import com.zemoso.OKR.exception.BadRequestException;
import com.zemoso.OKR.exception.ResourceAlreadyExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.logging.Logger;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository fUserRepository;

    private Logger logger = Logger.getLogger(UserController.class.getName());
    @Autowired
    public UserServiceImpl(final UserRepository userRepository){
     fUserRepository=userRepository;
    }

    public List<User> getAllUsers() {
            return fUserRepository.findAllByDeleted(false);
    }

    public User getUser(UUID id) {
        User user=fUserRepository.findByIdAndDeleted(id,false).orElseThrow(()->
                        new BadRequestException("User does not exist")
                );
        return user;
    }

    public User addUser(UserDTO userDTO) throws IncompleteFieldsException {
        User user=new User();

        if(userDTO.getFirstName().isPresent()) {
            String firstName = userDTO.getFirstName().get();
            user.setFirstName(firstName);
        }
        else {
            throw  new IncompleteFieldsException("Please fill the required fields");
        }

        if(userDTO.getLastName().isPresent()) {
            String lastName=userDTO.getLastName().get();
            user.setLastName(lastName);
        }
        else {
            throw  new IncompleteFieldsException("Please fill the required fields");
        }

        if(userDTO.getEmail().isPresent()) {
            String email = userDTO.getEmail().get();
            if(fUserRepository.existsByEmail(email)){
                throw new ResourceAlreadyExistException("Email Id Already Exist");
            }
            user.setEmail(email);
        }
        else {
            throw  new IncompleteFieldsException("Please fill the required fields");
        }

        userDTO.getIsOrganization().ifPresent(organization->{
            user.setIsOrganization(organization);
        });

        userDTO.getDesignation().ifPresent(designation->{
            user.setDesignation(designation);
        });
        return fUserRepository.save(user);
    }

    public User updateUser(UUID id, UserDTO userDTO) {
        User user=fUserRepository.getOneByIdAndDeleted(id, false);

        if(Objects.isNull(user)){
            throw new BadRequestException("User id is invalid");
        }
        userDTO.getFirstName().ifPresent(firstName->{
            user.setFirstName(firstName);
        });


        userDTO.getLastName().ifPresent(lastName->{
            user.setLastName(lastName);
        });

        userDTO.getEmail().ifPresent(email->{
            if(fUserRepository.existsByEmail(email)){
                throw new ResourceAlreadyExistException("Email Id Already Exist");
            }
            user.setEmail(email);
        });

        userDTO.getIsOrganization().ifPresent(isOrganization->{
            user.setIsOrganization(isOrganization);
        });

        userDTO.getDesignation().ifPresent(designation->{
            user.setDesignation(designation);
        });

        return fUserRepository.save(user);
    }

    public User deleteUser(UUID id) {
        User user=fUserRepository.getOneByIdAndDeleted(id, false);
        if(Objects.isNull(user)){
            throw new BadRequestException("User id is invalid");
        }
        user.setDeleted(true);
        fUserRepository.save(user);
        return user;
    }
}
