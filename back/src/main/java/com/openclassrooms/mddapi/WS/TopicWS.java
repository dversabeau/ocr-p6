package com.openclassrooms.mddapi.WS;

import com.openclassrooms.mddapi.DTO.TopicDTO;
import com.openclassrooms.mddapi.entity.User;
import com.openclassrooms.mddapi.services.TopicService;
import com.openclassrooms.mddapi.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/topic")
public class TopicWS {

    @Autowired
    private TopicService topicService;

    @Value("${oc.app.jwtSecret}")
    private String jwtSecret;

    @Autowired
    private UserService userService;

    @GetMapping(value = "")
    public List<TopicDTO> getAll(@RequestHeader("Authorization") String authorizationHeader){
        return topicService.getAll();
    }

    @GetMapping(value = "/no-subscribed")
    public List<TopicDTO> getAllNoSubscribedThemes(@RequestHeader("Authorization") String authorizationHeader){
        String jwtToken = authorizationHeader.substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwtToken).getBody();
        String identification = claims.get("sub", String.class);

        User user = userService.findUserByEmailOrUsername(identification).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));;

        return topicService.getAllThemesNoSubscribed(user.getId());
    }


    @GetMapping(value = "/subscribed")
    public List<TopicDTO> getAllSubscribedThemes(@RequestHeader("Authorization") String authorizationHeader){
        String jwtToken = authorizationHeader.substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwtToken).getBody();
        String identification = claims.get("sub", String.class);

        User user = userService.findUserByEmailOrUsername(identification).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));;

        return topicService.getAllThemesSubscribed(user.getId());
    }

}
