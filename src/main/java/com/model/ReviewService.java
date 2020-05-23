package com.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository;

    public List<Review> getReviewsFromEmail(String email) {
        return reviewRepository.findByEmail(email);
    }

    public List<Review> getReviewsFromMovieId(String movieId) {
        return reviewRepository.findByMovieId(movieId);
    }

    public Review getReviewFromEmailAndMovieId(String email, String movieId){
        return reviewRepository.findByEmailAndMovieId(email, movieId);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review insertReview(Review review) {
        return reviewRepository.save(review);
    }

    public void deleteReview(Review review) {
        reviewRepository.delete(review);
    }

    public Review updateReview(Review review) {
        Review tempReview = getReviewFromEmailAndMovieId(review.getEmail(), review.getMovieId());
        reviewRepository.delete(tempReview);
        return reviewRepository.save(review);
    }
}
