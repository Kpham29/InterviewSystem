package fsa.training.service;

import fsa.training.config.JwtUtil;
import fsa.training.dto.AccountDto;
import fsa.training.dto.RsPasswordDto;
import fsa.training.entity.Account;
import fsa.training.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import fsa.training.entity.RefreshToken;
import fsa.training.repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;


import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;


    public Map<String, Object> login(AccountDto dto) {
        Map<String, Object> response = new HashMap<>();

        Optional<Account> opt = accountRepository.login(dto.getUsername(), dto.getPassword());

        if (opt.isPresent()) {
            Account account = opt.get();

            String accessToken = jwtUtil.generateAccessToken(account.getUsername(), account.getRole().getRoleName());
            String refreshToken = jwtUtil.generateRefreshToken(account.getUsername());

            // Xoá token cũ (nếu có)
            refreshTokenRepository.deleteByAccount(account);

            // Lưu token mới
            RefreshToken newToken = new RefreshToken();
            newToken.setToken(refreshToken);
            newToken.setAccount(account);
            Date date = jwtUtil.getRefreshTokenExpiryDate();
            LocalDateTime expiry = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            newToken.setExpiryDate(expiry);

            refreshTokenRepository.save(newToken);

            response.put("success", true);
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("role", account.getRole().getRoleName());
        } else {
            response.put("success", false);
            response.put("accessToken", null);
            response.put("refreshToken", null);
            response.put("role", null);
        }

        return response;
    }

    @Transactional
    public Map<String, Object> refreshToken(String refreshToken) {
        Map<String, Object> response = new HashMap<>();

        Optional<RefreshToken> tokenOpt = refreshTokenRepository.findByToken(refreshToken);

        if (tokenOpt.isPresent()) {
            RefreshToken tokenEntity = tokenOpt.get();
            Date expiryDate = Date.from(tokenEntity.getExpiryDate().atZone(ZoneId.systemDefault()).toInstant());
            if (expiryDate.before(new Date())) {
                refreshTokenRepository.delete(tokenEntity);
                response.put("success", false);
                response.put("message", "Refresh token expired");
                return response;
            }

            String username = tokenEntity.getAccount().getUsername();
            String role = tokenEntity.getAccount().getRole().getRoleName();
            String newAccessToken = jwtUtil.generateAccessToken(username, role);

            response.put("success", true);
            response.put("accessToken", newAccessToken);
            return response;
        }

        response.put("success", false);
        response.put("message", "Invalid refresh token");
        return response;
    }


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

    @Transactional
    public Map<String, Object> logout(String username) {
        Map<String, Object> response = new HashMap<>();

        Optional<Account> opt = accountRepository.findByUsername(username);
        if (opt.isPresent()) {
            Account account = opt.get();
            refreshTokenRepository.deleteByAccount(account);
            response.put("success", true);
            response.put("message", "Logout successful, refresh token deleted.");
        } else {
            response.put("success", false);
            response.put("message", "User not found.");
        }

        return response;
    }

}
