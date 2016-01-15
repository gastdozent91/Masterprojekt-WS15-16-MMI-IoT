package de.bht.mmi.iot.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import de.bht.mmi.iot.model.RoleConstants;
import de.bht.mmi.iot.validator.Contain;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Set;

public final class UserPostDto {

    @NotNull
    @Size(min = 3)
    @Pattern(regexp = "^\\w+$")
    private String username;

    @NotNull
    @Size(min = 3)
    private final String password;

    private final String firstname;

    private final String lastname;

    @NotNull
    @Size(min = 1)
    @Contain({RoleConstants.ROLE_ADMIN, RoleConstants.ROLE_USER})
    private final Set<String> roles;

    @JsonCreator
    public UserPostDto(@JsonProperty("username") String username, @JsonProperty("password") String password,
                       @JsonProperty("firstname") String firstname, @JsonProperty("lastname") String lastname,
                       @JsonProperty("roles") Set<String> roles) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
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
