package com.example.demo;

import com.api.OMDbWebServiceClient;
import com.model.User;
import com.model.UserRepository;
import com.model.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class AmdApplication {
    public static void main(String[] args) {
        SpringApplication.run(AmdApplication.class, args);
    }
}
