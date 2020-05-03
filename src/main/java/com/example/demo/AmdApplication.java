package com.example.demo;

import com.api.OMDbWebServiceClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/search")
    public String searchMoviesWithName(@RequestParam(value = "name", defaultValue = "Star Wars") String title) {
        return OMDbWebServiceClient.searchMovieByTitle(title);
    }

    @GetMapping("/movie")
    public String getMovieWithId(@RequestParam(value = "id", defaultValue = "tt0076759") String id) {
        return OMDbWebServiceClient.searchMovieByID(id);
    }

}
