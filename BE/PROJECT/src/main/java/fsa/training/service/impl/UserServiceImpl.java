package fsa.training.service.impl;

import fsa.training.dto.UserDTO;
import fsa.training.entity.Account;
import fsa.training.entity.Role;
import fsa.training.entity.User;
import fsa.training.repository.RoleRepository;
import fsa.training.repository.UserRepository;
import fsa.training.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<UserDTO> getAllUsers(Pageable pageable) {
        Page<User> userPage = userRepository.findAll(pageable);
        return userPage.map(user -> {
            Account acc = user.getAccount();
            return new UserDTO(
                    user.getUserId(),
                    user.getFullName(),
                    acc != null ? acc.getEmail() : null,
                    null,
                    null,
                    acc != null && acc.getRole() != null ? acc.getRole().getRoleName() : null,
                    user.getAddress(),
                    acc != null && Boolean.TRUE.equals(acc.getIsActive()) ? "Active" : "Inactive"
            );
        });
    }

    @Override
    public UserDTO getUserDTOById(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        Account acc = user.getAccount();
        return new UserDTO(
                user.getUserId(),
                user.getFullName(),
                acc != null ? acc.getEmail() : null,
                null,
                null,
                acc != null && acc.getRole() != null ? acc.getRole().getRoleName() : null,
                user.getAddress(),
                acc != null && acc.getIsActive() != null && acc.getIsActive() ? "Active" : "Inactive"
        );
    }
    @Override
    public UserDTO updateUserDTO(Integer id, UserDTO dto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        existingUser.setFullName(dto.getFullName());
        existingUser.setAddress(dto.getAddress());
        // Nếu muốn cập nhật các field khác thì kiểm tra null trước:
        if (dto.getStatus() != null) {
            existingUser.getAccount().setIsActive(dto.getStatus().equalsIgnoreCase("Active"));
        }

        // Lưu lại
        User savedUser = userRepository.save(existingUser);

        // Trả về lại DTO
        return new UserDTO(
                savedUser.getUserId(),
                savedUser.getFullName(),
                savedUser.getAccount().getEmail(),
                null,
                null,
                savedUser.getAccount().getRole().getRoleName(),
                savedUser.getAddress(),
                savedUser.getAccount().getIsActive() ? "Active" : "Inactive"
        );
    }
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public UserDTO addUserDTO(UserDTO dto) {
        Role role = roleRepository.findByRoleName(dto.getRole());

        if (role == null) {
            throw new RuntimeException("Invalid role name: " + dto.getRole());
        }

        Account account = new Account();
        account.setEmail(dto.getEmail());
        account.setUsername(dto.getUsername()); // ✅ Thêm username
        account.setPassword(dto.getPassword());
        account.setRole(role);
        account.setIsActive("Active".equalsIgnoreCase(dto.getStatus()));

        User user = new User();
        user.setFullName(dto.getFullName());
        user.setAddress(dto.getAddress());
        user.setAccount(account);

        user = userRepository.save(user);

        return new UserDTO(
                user.getUserId(),
                user.getFullName(),
                user.getAccount().getEmail(),
                user.getAccount().getUsername(),
                user.getAccount().getPassword(),
                user.getAccount().getRole().getRoleName(),
                user.getAddress(),
                user.getAccount().getIsActive() ? "Active" : "Inactive"
        );
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