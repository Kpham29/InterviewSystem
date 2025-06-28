package fsa.training.service;

import fsa.training.dto.UserDTO;
import fsa.training.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    Page<UserDTO> getAllUsers(Pageable pageable);

    UserDTO getUserDTOById(Integer id);
    UserDTO updateUserDTO(Integer id, UserDTO userDTO);
    UserDTO addUserDTO(UserDTO userDTO);
   /*
    User addUser(User user);

    User updateUser(Integer id, User user);

    void deleteUser(Integer id);*/
}