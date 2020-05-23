package com.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistRepository extends JpaRepository<WatchlistItem, Integer> {
    List<WatchlistItem> findByEmail(String email);
    List<WatchlistItem> findByMovieId(String movieId);
    WatchlistItem findByEmailAndMovieId(String email, String movieId);
}
