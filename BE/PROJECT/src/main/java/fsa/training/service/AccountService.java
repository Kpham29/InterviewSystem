package fsa.training.service;

import fsa.training.config.JwtUtil;
import fsa.training.dto.AccountDto;
import fsa.training.dto.RsPasswordDto;
import fsa.training.entity.Account;
import fsa.training.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtUtil jwtUtil; 

    public Map<String, Object> login(AccountDto dto) {
        Map<String, Object> response = new HashMap<>();

        accountRepository
                .login(dto.getUsername(), dto.getPassword())
                .ifPresentOrElse(account -> {
                    String token = jwtUtil.generateToken(account.getUsername(), account.getRole().getRoleName());

                    response.put("success", true);
                    response.put("token", token);
                    response.put("role", account.getRole().getRoleName());
                }, () -> {
                    response.put("success", false);
                    response.put("token", null);
                    response.put("role", null);
                });

        return response;
    }

    @Autowired
    private EmailService emailService;

    public Map<String, Object> forgotPassword(String email) {
        Map<String, Object> response = new HashMap<>();

        Optional<Account> opt = accountRepository.findByEmail(email);
        if (opt.isPresent()) {
            Account account = opt.get();
            String token = UUID.randomUUID().toString();

            String resetLink = "http://localhost:3000/reset-password?username=" + account.getUsername() + "&token=" + token;

            emailService.sendResetPasswordEmail(email, resetLink);
            
            response.put("success", true);
        } else {
            response.put("success", false);
        }

        return response;
    }

    public Map<String, Object> resetPassword(RsPasswordDto dto) {
        Map<String, Object> response = new HashMap<>();
        Optional<Account> opt = accountRepository.findByUsername(dto.getUsername());

        if (opt.isPresent()) {
            Account account = opt.get();
            account.setPassword(dto.getNewPassword());
            accountRepository.save(account);
            response.put("success", true);
        } else {
            response.put("success", false);
        }

        return response;
    }

}
