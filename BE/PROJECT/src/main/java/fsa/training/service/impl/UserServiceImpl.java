package fsa.training.service.impl;

import fsa.training.entity.User;
import fsa.training.repository.UserRepository;
import fsa.training.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

   @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    /*
    @Override
    public User addUser(User user) {
        // Add any business logic here, e.g., validations
        return userRepository.save(user);
    }

    /*@Override
    public User updateUser(Integer id, User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Update fields in the existing user
        existingUser.setFullName(user.getFullName());
        existingUser.setGender(user.getGender());
        existingUser.setDob(user.getDob());
        existingUser.setPhone(user.getPhone());
        existingUser.setAddress(user.getAddress());
        existingUser.setAccount(user.getAccount());

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Integer id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        userRepository.delete(existingUser);
    }*/
}