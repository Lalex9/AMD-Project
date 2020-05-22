package com.example.demo;

import com.api.OMDbWebServiceClient;
import com.model.User;
import com.model.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;

@RestController
@EntityScan("com.model")
@ComponentScan("com.model")
@EnableJpaRepositories("com.model")
public class Controller {
    @Autowired
    UserService userService;

    @RequestMapping(value="/")
    public String hello() {
        return "Hello World";
    }

    @CrossOrigin
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

    @CrossOrigin
    @PostMapping(path="/addUser", consumes = "application/json", produces = "application/json")
    public User addNewUser (@RequestBody User user) {
        return userService.insertUser(user);
    }

    @CrossOrigin
    @PostMapping(path="/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity register (@RequestBody User user) {
        User tempUser = userService.getUserWithEmail(user.getEmail());
        if (tempUser == null) {
            userService.insertUser(user);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin
    @PostMapping(path="/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity login (@RequestBody User user) {
        User tempUser = userService.getUserWithEmailAndPassword(user.getEmail(), user.getPassword());
        if (tempUser != null) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin
    @GetMapping(path="/allUsers")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
