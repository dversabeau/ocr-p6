package com.openclassrooms.mddapi.WS;

import com.openclassrooms.mddapi.entity.Subscription;
import com.openclassrooms.mddapi.entity.User;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.services.SubscriptionService;
import com.openclassrooms.mddapi.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/subscription")
public class SubscriptionWS {
    @Value("${oc.app.jwtSecret}")
    private String jwtSecret;

    @Autowired
    private UserService userService;

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/subscribe/{topicId}")
    public ResponseEntity<?> subscribe(@PathVariable Long topicId, @RequestHeader("Authorization") String authorizationHeader) {
        try {
            String jwtToken = authorizationHeader.substring(7);
            Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwtToken).getBody();
            String identification = claims.get("sub", String.class);

            User user = userService.findUserByEmailOrUsername(identification);

            Subscription subscription = subscriptionService.subscribe(topicId, user.getId());
            if (subscription != null) {
                return ResponseEntity.ok(new MessageResponse("Topic subscribed"));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Failed to subscribe to the topic"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Internal Server Error"));
        }
    }

    @PostMapping("/unsubscribe/{topicId}")
    public ResponseEntity<?> unsubscribe(@PathVariable Long topicId, @RequestHeader("Authorization") String authorizationHeader) {
        try {
            String jwtToken = authorizationHeader.substring(7);
            Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwtToken).getBody();
            String identification = claims.get("sub", String.class);

            User user = userService.findUserByEmailOrUsername(identification);

            subscriptionService.unsubscribe(topicId, user.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Internal Server Error"));
        }
        return ResponseEntity.ok(new MessageResponse("Topic unsubscribed"));
    }

}
