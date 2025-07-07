package fsa.training.controller;

import fsa.training.dto.AccountDto;
import fsa.training.dto.RsPasswordDto;
import fsa.training.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AccountDto dto) {
        Map<String, Object> result = accountService.login(dto);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/token/refresh")
    public ResponseEntity<Map<String, Object>> refresh(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        Map<String, Object> result = accountService.refreshToken(refreshToken);

        if (Boolean.TRUE.equals(result.get("success"))) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(401).body(result);
        }
    }

    @PostMapping("/logout")
    public Map<String, Object> logout(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        return accountService.logout(username);
    }
}
