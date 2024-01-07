package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.DTO.PostDTO;
import com.openclassrooms.mddapi.DTO.TopicDTO;
import com.openclassrooms.mddapi.dao.PostRepository;
import com.openclassrooms.mddapi.entity.Post;
import com.openclassrooms.mddapi.entity.Topic;
import com.openclassrooms.mddapi.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private TopicService topicService;

    @Autowired
    private PostRepository postRepository;

    public List<PostDTO> getFeed(Long userId) {
        List<TopicDTO> topics = topicService.getAllThemesSubscribed(userId);

        List<Long> topicIds = new ArrayList<>();

        for(TopicDTO topicDTO : topics){
            topicIds.add(topicDTO.getId_topic());
        }


        List<Post> entities = postRepository.getFeed(userId, topicIds);
        List<PostDTO> dtos = new ArrayList<>();
        for(Post post : entities){
            PostDTO dto = dtoFromEntity(post);
            dtos.add(dto);
        }
        return  dtos;
    }

    public void create(User user, Post post) {
        post.setId_user(user.getId());
        post.setAuthor(user.getUsername());
        postRepository.save(post);
    }

    public PostDTO findPostById(Long id) {
        Optional<Post> entity = postRepository.findById(id);
        return entity.map(this::dtoFromEntity).orElse(null);
    }

    public PostDTO dtoFromEntity(Post entity){
        PostDTO dto = new PostDTO();

        dto.setId_post(entity.getId_post());
        dto.setId_topic(entity.getId_topic());
        dto.setId_user(entity.getId_user());
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        dto.setAuthor(entity.getAuthor());
        dto.setTopic(entity.getTopic());
        dto.setCreated_at(entity.getCreated_at());

        return dto;
    }



}
