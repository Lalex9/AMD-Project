package com.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class WatchlistService {
    @Autowired
    WatchlistRepository watchlistRepository;

    public List<WatchlistItem> getWatchlistItemWithEmail(String email) {
        return watchlistRepository.findByEmail(email);
    }

    public List<WatchlistItem> getWatchlistItemWithMovieId(String movieID) {
        return watchlistRepository.findByMovieId(movieID);
    }

    public WatchlistItem getWatchlistItemFromEmailAndMovieId(String email, String movieId){
        return watchlistRepository.findByEmailAndMovieId(email, movieId);
    }

    public List<WatchlistItem> getAllWatchlistItems() {
        return watchlistRepository.findAll();
    }

    public WatchlistItem insertWatchlistItem(WatchlistItem watchlistItem) {
        return watchlistRepository.save(watchlistItem);
    }

    public void deleteWatchlistItem(WatchlistItem watchlistItem) {
        watchlistRepository.delete(watchlistItem);
    }
}
