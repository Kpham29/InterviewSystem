package fsa.training.service;

import fsa.training.entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

   User getUserById(Integer id);
   /*
    User addUser(User user);

    User updateUser(Integer id, User user);

    void deleteUser(Integer id);*/
}