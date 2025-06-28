package fsa.training.repository;

import fsa.training.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByRoleName(String roleName); // Dùng để tìm role theo tên
}
