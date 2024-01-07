package com.openclassrooms.mddapi.WS;

import com.openclassrooms.mddapi.DTO.CommentDTO;
import com.openclassrooms.mddapi.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/comment")
public class CommentWS {

    @Autowired
    private CommentService commentService;

    @GetMapping(value = "/post/{id}")
    public List<CommentDTO> getCommentByPostId( @PathVariable String id) {
        return commentService.getCommentByPostId(Long.valueOf(id));
    }
}
