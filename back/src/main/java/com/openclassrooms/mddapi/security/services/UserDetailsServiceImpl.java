package com.openclassrooms.mddapi.security.services;

import com.openclassrooms.mddapi.dao.UserRepository;
import com.openclassrooms.mddapi.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  UserRepository userRepository;

  UserDetailsServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByEmailOrUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

    return UserDetailsImpl
            .builder()
            .id(user.getId())
            .username(user.getEmail())
            .password(user.getPassword())
            .build();
  }

}
