package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dao.SubscriptionRepository;
import com.openclassrooms.mddapi.entity.Subscription;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public Subscription subscribe(Long topicId, Long userId){
        Subscription subscription = new Subscription();
        subscription.setTopic_id(topicId);
        subscription.setUser_id(userId);
        return subscriptionRepository.save(subscription);
    }

    @Transactional
    public void unsubscribe(Long topicId, Long userId){
        subscriptionRepository.deleteSubscription(topicId, userId);
    }

}
