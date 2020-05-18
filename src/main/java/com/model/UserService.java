package com.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User getUserWithEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserWithEmailAndPassword(String email, String password){
        return userRepository.findByEmailAndPassword(email, password);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User insertUser(User user) {
        return userRepository.save(user);
    }
}
