package com.example.demo;

import com.api.OMDbWebServiceClient;
import com.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@RestController
@EntityScan("com.model")
@ComponentScan("com.model")
@EnableJpaRepositories("com.model")
public class Controller {
    @Autowired
    UserService userService;
    @Autowired
    WatchlistService watchlistService;
    @Autowired
    ReviewService reviewService;

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

    @CrossOrigin
    @PostMapping(path="/addMovieToWatchlist")
    public ResponseEntity addMovieToWatchlist(@RequestBody WatchlistItem watchlistItem) {
        WatchlistItem tempItem = watchlistService.getWatchlistItemFromEmailAndMovieId(watchlistItem.getEmail(), watchlistItem.getMovieId());
        if (tempItem == null) {
            /// Movie added to user's watchlist
            watchlistService.insertWatchlistItem(watchlistItem);
            return ResponseEntity.ok().build();
        } else {
            /// Movie already exists in the watchlist
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin
    @PostMapping(path = "/removeMovieFromWatchlist")
    public ResponseEntity removeMovieFromWatchlist(@RequestBody WatchlistItem watchlistItem) {
        WatchlistItem tempItem = watchlistService.getWatchlistItemFromEmailAndMovieId(watchlistItem.getEmail(), watchlistItem.getMovieId());
        if (tempItem != null){
            /// Movie removed from user's watchlist
            watchlistService.deleteWatchlistItem(watchlistItem);
            return ResponseEntity.ok().build();
        } else {
            /// Movie could not be found in the watchlist
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin
    @GetMapping(path = "/getAllWatchlistItemsFromUser")
    public Iterable<String> getAllWatchlistItemsFromUser(@RequestParam(value = "user", defaultValue = "") String userAddress) {
        if (userAddress.isEmpty())
            return Arrays.asList("Unknown user address.");
        List<WatchlistItem> items =  watchlistService.getWatchlistItemWithEmail(userAddress);
        List<String> returnElements = new ArrayList<>();
        for (WatchlistItem item: items)
            returnElements.add(item.getMovieId());
        return returnElements;
    }

    @CrossOrigin
    @GetMapping(path = "/getAllUsersWithThisMovieInWatchlist")
    public Iterable<String> getAllUsersWithThisMovieInWatchlist(@RequestParam(value = "movieId", defaultValue = "") String movieId) {
        if (movieId.isEmpty())
            return Arrays.asList("Unknown movie ID.");
        List<WatchlistItem> items = watchlistService.getWatchlistItemWithMovieId(movieId);
        List<String> returnElements = new ArrayList<>();
        for (WatchlistItem item: items)
            returnElements.add(item.getEmail());
        return returnElements;
    }

    @CrossOrigin
    @GetMapping(path="/allWatchlistItems")
    public @ResponseBody Iterable<WatchlistItem> getAllWatchlistItems() {
        return watchlistService.getAllWatchlistItems();
    }

    @CrossOrigin
    @PostMapping(path="/addReview")
    public ResponseEntity addMovieReview(@RequestBody Review review) {
        Review tempItem = reviewService.getReviewFromEmailAndMovieId(review.getEmail(), review.getMovieId());
        if (tempItem == null) {
            /// Review added
            reviewService.insertReview(review);
            return ResponseEntity.ok().build();
        } else {
            /// Review already exists. Use the update review endpoint
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin
    @PostMapping(path="/updateReview")
    public ResponseEntity updateMovieReview(@RequestBody Review review) {
        Review tempItem = reviewService.getReviewFromEmailAndMovieId(review.getEmail(), review.getMovieId());
        if (tempItem != null) {
            /// Review updated
            reviewService.updateReview(review);
            return ResponseEntity.ok().build();
        } else {
            /// No review exists for this movie. Use the add review endpoint
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin
    @PostMapping(path = "/removeReview")
    public ResponseEntity removeReview(@RequestBody Review review) {
        Review tempItem = reviewService.getReviewFromEmailAndMovieId(review.getEmail(), review.getMovieId());
        if (tempItem != null){
            /// Review removed
            reviewService.deleteReview(review);
            return ResponseEntity.ok().build();
        } else {
            /// Review could not be deleted, it probably doesn't exist
            return ResponseEntity.badRequest().build();
        }
    }

    @CrossOrigin
    @GetMapping(path = "/getAllReviewsFromUser")
    public Iterable<Review> getAllReviewsFromUser(@RequestParam(value = "user", defaultValue = "") String userAddress) {
        if (userAddress.isEmpty())
            return null;
        return reviewService.getReviewsFromEmail(userAddress);
    }

    @CrossOrigin
    @GetMapping(path = "/getAllReviewsForMovie")
    public Iterable<Review> getAllReviewsForMovie(@RequestParam(value = "movieId", defaultValue = "") String movieId) {
        if (movieId.isEmpty())
            return null;
        return reviewService.getReviewsFromMovieId(movieId);
    }

    @CrossOrigin
    @GetMapping(path="/allReviews")
    public @ResponseBody Iterable<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }
}
