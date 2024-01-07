package com.openclassrooms.mddapi.dao;

import com.openclassrooms.mddapi.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = "SELECT c.* FROM comments AS c\n" +
            "WHERE c.post_id = :postId\n" +
            "ORDER BY c.created_at DESC", nativeQuery = true)
    List<Comment> findAllByPostId(@Param("postId") Long postId);

}
