package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.DTO.CommentDTO;
import com.openclassrooms.mddapi.dao.CommentRepository;
import com.openclassrooms.mddapi.entity.Comment;
import com.openclassrooms.mddapi.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<CommentDTO> getCommentByPostId(Long postId) {
        List<Comment> comments = commentRepository.findAllByPostId(postId);
        List<CommentDTO> dtos = new ArrayList<>();
        for(Comment comment : comments){
            CommentDTO dto = dtoFromEntity(comment);
            dtos.add(dto);
        }
        return dtos;
    }

    public CommentDTO dtoFromEntity(Comment entity){
        CommentDTO dto = new CommentDTO();

        dto.setId_comment(entity.getId());
        dto.setId_post(entity.getId_post());
        dto.setId_user(entity.getId_user());
        dto.setAuthor(entity.getAuthor());
        dto.setContent(entity.getContent());
        dto.setCreated_at(entity.getCreated_at());

        return dto;
    }

    public Comment createComment(Long id, String content, User user) {
        Comment comment = new Comment();
        comment.setId_post(id);
        comment.setId_user(user.getId());
        comment.setAuthor(user.getUsername());
        comment.setContent(content);

        return commentRepository.save(comment);
    }
}
