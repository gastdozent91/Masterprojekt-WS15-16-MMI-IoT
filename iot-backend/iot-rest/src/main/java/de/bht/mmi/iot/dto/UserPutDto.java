package de.bht.mmi.iot.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

public class UserPutDto {

        @NotNull
        @Size(min = 1)
        private final String firstname;

        @NotNull
        @Size(min = 1)
        private final String lastname;

        @NotNull
        @Size(min = 1)
        private final Set<String> roles;

        @JsonCreator
        public UserPutDto(@JsonProperty("firstname") String firstname,
                           @JsonProperty("lastname") String lastname,
                           @JsonProperty("authorities") Set<String> roles) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.roles = roles;
        }

        public String getFirstname() {
            return firstname;
        }

        public String getLastname() {
            return lastname;
        }

        public Set<String> getRoles() {
            return roles;
        }

}
