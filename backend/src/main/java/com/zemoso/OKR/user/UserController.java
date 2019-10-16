package com.zemoso.OKR.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private Logger logger = Logger.getLogger(UserController.class.getName());


    private UserService fUserService;

    @Autowired
    public UserController(final UserService userService){
        fUserService=userService;
    }

    @GetMapping(value = "/users")
    public ResponseEntity<?> getAllUsers()  {
            return new ResponseEntity<>(fUserService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping(value = "/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable UUID id)  {
            User user = fUserService.getUser(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping(value = "/users")
    public ResponseEntity<User> addUser(@RequestBody final UserDTO userDTO) {
            return new ResponseEntity<>(fUserService.addUser(userDTO), HttpStatus.CREATED);
    }

    @PutMapping(value = "/users/{id}")
    public ResponseEntity<User> updateUser(@RequestBody final UserDTO userDTO, @PathVariable UUID id) {
            return new ResponseEntity<>(fUserService.updateUser(id,userDTO), HttpStatus.OK);
    }

    @DeleteMapping(value = "/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable UUID id) {
            fUserService.deleteUser(id);
            return new ResponseEntity<>("User marked as deleted", HttpStatus.ACCEPTED);
    }

}
