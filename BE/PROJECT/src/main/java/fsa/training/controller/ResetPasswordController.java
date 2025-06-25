package fsa.training.controller;

import fsa.training.dto.RsPasswordDto;
import fsa.training.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ResetPasswordController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/reset-password")
    public Map<String, Object> resetPassword(@RequestBody RsPasswordDto dto) {
        return accountService.resetPassword(dto);
    }
}