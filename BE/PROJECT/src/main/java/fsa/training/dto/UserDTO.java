package fsa.training.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


    @Getter
    @Setter
    @AllArgsConstructor
    public class UserDTO {
        private Integer userId;
        private String fullName;
        private String email;
        private String username;
        private String password;
        private String role;
        private String address;
        private String status;
    }
