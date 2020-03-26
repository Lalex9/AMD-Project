package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class AmdApplication {

    public static void main(String[] args) {
        SpringApplication.run(AmdApplication.class, args);
    }

    @RequestMapping(value="/")
    public String hello() {
        return "Hello World";
    }

}
