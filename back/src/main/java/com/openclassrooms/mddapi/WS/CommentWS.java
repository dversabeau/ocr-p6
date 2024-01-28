package com.openclassrooms.mddapi.WS;

import com.openclassrooms.mddapi.DTO.CommentDTO;
import com.openclassrooms.mddapi.entity.Comment;
import com.openclassrooms.mddapi.entity.User;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.services.CommentService;
import com.openclassrooms.mddapi.services.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/comment")
public class CommentWS {

    @Value("${oc.app.jwtSecret}")
    private String jwtSecret;

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/post/{id}")
    public List<CommentDTO> getCommentByPostId(@PathVariable String id) {
        return commentService.getCommentByPostId(Long.valueOf(id));
    }

    @PostMapping("/post/{id}")
    public ResponseEntity<?> createComment(@PathVariable String id, @RequestHeader("Authorization") String authorizationHeader, @RequestBody String content) {
        try {
            String jwtToken = authorizationHeader.substring(7);
            Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwtToken).getBody();
            String identification = claims.get("sub", String.class);

            User user = userService.findUserByEmailOrUsername(identification).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
            commentService.createComment(Long.valueOf(id), content, user);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Internal Server Error"));
        }
        return ResponseEntity.ok(new MessageResponse("Comment created"));
    }
}
