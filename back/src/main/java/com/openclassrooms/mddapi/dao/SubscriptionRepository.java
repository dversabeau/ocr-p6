package com.openclassrooms.mddapi.dao;

import com.openclassrooms.mddapi.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Subscription save(Subscription subscription);

    @Transactional
    @Modifying
    @Query(value = "delete from subscriptions where topic_id = :topicId and user_id = :userId", nativeQuery = true)
    void deleteSubscription(@Param("topicId") Long topicId, @Param("userId") Long userId);
}
