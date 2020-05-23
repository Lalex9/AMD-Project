package com.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByEmail(String email);
    List<Review> findByMovieId(String movieId);
    Review findByEmailAndMovieId(String email, String movieId);
}
