package com.openclassrooms.mddapi.entity;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "SUBSCRIPTIONS",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "topic_id"})
})
@Data
@Accessors(chain = true)
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(of = {"id"})
@Builder
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
public class Subscription {
    @Id
    @Column(name = "subscription_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private Long user_id;
    @NonNull
    private Long topic_id;
    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private Date created_at;
}
