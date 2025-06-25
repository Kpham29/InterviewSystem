package fsa.training.controller;

import fsa.training.dto.AccountDto;
import fsa.training.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody AccountDto dto) {
        return accountService.login(dto);
    }
}
