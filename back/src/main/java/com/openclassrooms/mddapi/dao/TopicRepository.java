package com.openclassrooms.mddapi.dao;

import com.openclassrooms.mddapi.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, Long> {

    @Query(value = "SELECT t.* FROM topics AS t\n" +
            "LEFT JOIN subscriptions AS s ON t.topic_id = s.topic_id " +
            "AND s.user_id = :userId\n" +
            "WHERE s.topic_id IS NULL;\n", nativeQuery = true)
    List<Topic> getAllThemesNoSubscribed(@Param("userId") Long userId);

    @Query(value = "SELECT t.* FROM topics AS t\n" +
            "LEFT JOIN subscriptions AS s ON t.topic_id = s.topic_id " +
            "AND s.user_id = :userId\n" +
            "WHERE s.topic_id IS NOT NULL;\n", nativeQuery = true)
    List<Topic> getAllThemesSubscribed(@Param("userId") Long userId);

    List<Topic> findAll();
}