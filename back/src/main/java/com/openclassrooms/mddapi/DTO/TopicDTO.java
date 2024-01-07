package com.openclassrooms.mddapi.DTO;

import java.util.Date;

public class TopicDTO {
    private Long id_topic;

    private String title;

    private String content;

    private Date created_at;

    public Long getId_topic() {
        return id_topic;
    }

    public void setId_topic(Long id_topic) {
        this.id_topic = id_topic;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }
}
