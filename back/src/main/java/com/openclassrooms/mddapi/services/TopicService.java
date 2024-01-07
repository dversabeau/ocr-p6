package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.DTO.TopicDTO;
import com.openclassrooms.mddapi.dao.TopicRepository;
import com.openclassrooms.mddapi.entity.Topic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;


    public List<TopicDTO> getAll() {
        List<Topic> entities = topicRepository.findAll();
        List<TopicDTO> dtos = new ArrayList<>();
        for(Topic topic : entities){
            TopicDTO dto = dtoFromEntity(topic);
            dtos.add(dto);
        }

        return dtos;
    }

    public List<TopicDTO> getAllThemesNoSubscribed(Long userId) {
        List<Topic> entities = topicRepository.getAllThemesNoSubscribed(userId);
        List<TopicDTO> dtos = new ArrayList<>();
        for(Topic topic : entities){
            TopicDTO dto = dtoFromEntity(topic);
            dtos.add(dto);
        }

        return dtos;
    }


    public List<TopicDTO> getAllThemesSubscribed(Long userId) {
        List<Topic> entities = topicRepository.getAllThemesSubscribed(userId);
        List<TopicDTO> dtos = new ArrayList<>();
        for(Topic topic : entities){
            TopicDTO dto = dtoFromEntity(topic);
            dtos.add(dto);
        }

        return dtos;
    }

    public TopicDTO dtoFromEntity(Topic entity){
        TopicDTO dto = new TopicDTO();

        dto.setId_topic(entity.getTopic_id());
        dto.setContent(entity.getDescription());
        dto.setTitle(entity.getTitle());
        dto.setCreated_at(entity.getCreated_at());

        return dto;
    }


}
