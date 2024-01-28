package com.openclassrooms.mddapi.WS;

import com.openclassrooms.mddapi.DTO.PostDTO;
import com.openclassrooms.mddapi.entity.Post;
import com.openclassrooms.mddapi.entity.User;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.services.PostService;
import com.openclassrooms.mddapi.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/post")
public class PostWS {

    @Value("${oc.app.jwtSecret}")
    private String jwtSecret;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @GetMapping(value = "")
    public List<PostDTO> getFeed(@RequestHeader("Authorization") String authorizationHeader) {
        String jwtToken = authorizationHeader.substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwtToken).getBody();
        String identification = claims.get("sub", String.class);

        User user = userService.findUserByEmailOrUsername(identification).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));;

        return postService.getFeed(user.getId());
    }

    @GetMapping(value = "/{id}")
    public PostDTO getPostById(@PathVariable Long id) {
        return postService.findPostById(id);
    }

    @PostMapping(value = "")
    public ResponseEntity<?> createPost(@RequestHeader("Authorization") String authorizationHeader,
                                        @RequestBody Post post) {
        String jwtToken = authorizationHeader.substring(7);
        Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwtToken).getBody();
        String identification = claims.get("sub", String.class);

        User user = userService.findUserByEmailOrUsername(identification).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));;

        if (user != null) {
            postService.create(user, post);
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        return ResponseEntity.ok(new MessageResponse("Post created !"));
    }
}
