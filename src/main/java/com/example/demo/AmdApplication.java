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

    @GetMapping("/searchMovie")
    public String searchMoviesWithName(@RequestParam(value = "title", defaultValue = "") String title,
                                       @RequestParam(value = "id", defaultValue = "") String id) {
        if (title.isEmpty() && id.isEmpty()) {
            return "Use the \"title\" or the \"id\" parameters to acces the endpoint.";
        }

        if (!id.isEmpty()) {
            return OMDbWebServiceClient.searchMovieByID(id);
        }
        return OMDbWebServiceClient.searchMovieByTitle(title);
    }
}
