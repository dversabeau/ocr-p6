package com.openclassrooms.mddapi.dao;

import com.openclassrooms.mddapi.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query(value = "SELECT p.* FROM posts AS p\n" +
            "LEFT JOIN subscriptions AS s ON p.topic_id = s.topic_id " +
            "AND s.user_id = :userId \n" +
            "WHERE s.topic_id IN ( :result )", nativeQuery = true)
    List<Post> getFeed(@Param("userId") Long userId, @Param("result") List<Long> result);

    Post save(Post post);
}