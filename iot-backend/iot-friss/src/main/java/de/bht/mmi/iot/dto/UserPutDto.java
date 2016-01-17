package de.bht.mmi.iot.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.validator.Contain;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

public class UserPutDto {

    private final String firstname;

    private final String lastname;

    @NotNull
    private final String password;

    @NotNull
    @Size(min = 1)
    @Contain({RoleConstants.ROLE_ADMIN, RoleConstants.ROLE_USER})
    private final Set<String> roles;

    @JsonCreator
    public UserPutDto(@JsonProperty("firstname") String firstname,
                      @JsonProperty("lastname") String lastname,
                      @JsonProperty("password") String password,
                      @JsonProperty("roles") Set<String> roles) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.roles = roles;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getPassword() {
        return password;
    }

    public Set<String> getRoles() {
        return roles;
    }

}
