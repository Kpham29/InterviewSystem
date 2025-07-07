package fsa.training.controller;

import fsa.training.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ForgotPasswordController {
    @Autowired
    private AccountService accountService;

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, Object>> forgotPassword(@RequestParam String email) {
        Map<String, Object> result = accountService.forgotPassword(email);
        return ResponseEntity.ok(result);
    }
}
