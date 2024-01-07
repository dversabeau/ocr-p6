package com.openclassrooms.mddapi.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeDTO {
    private String email;
    private String username;

    public MeDTO(String email, String username) {
        this.email = email;
        this.username = username;
    }
}
