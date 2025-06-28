package fsa.training.controller;

import fsa.training.dto.UserDTO;
import fsa.training.entity.User;
import fsa.training.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    // Fetch all users
    @GetMapping
    public Page<UserDTO> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return userService.getAllUsers(pageable);
    }


    @GetMapping("/{id}/detail")
    public UserDTO getUserById(@PathVariable Integer id) {
        return userService.getUserDTOById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUserDTO(@PathVariable Integer id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUserDTO(id, userDTO));
    }
    @PostMapping
    public UserDTO addUserDTO(@RequestBody UserDTO user) {
        return userService.addUserDTO(user);
    }

    /*
    // Add a new user
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    // Update an existing user
   /* @PutMapping("/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // Delete a user
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }*/
}