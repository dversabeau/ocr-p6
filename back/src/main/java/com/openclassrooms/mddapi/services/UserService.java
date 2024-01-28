package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dao.UserRepository;
import com.openclassrooms.mddapi.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findUserByEmailOrUsername(String identification) {
        return userRepository.findByEmailOrUsername(identification);
    }
}
