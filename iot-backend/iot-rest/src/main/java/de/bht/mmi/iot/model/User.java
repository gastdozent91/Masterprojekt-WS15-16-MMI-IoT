package de.bht.mmi.iot.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBIgnore;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@DynamoDBTable(tableName = "User")
public class User implements UserDetails {

    private String username;

    @JsonIgnore
    private String password;

    private String firstname;

    private String lastname;

    private Set<String> roles = new HashSet<String>();

    private List<String> sensorList;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        addRole(RoleConstants.ROLE_USER);
    }

    public User() { }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    @DynamoDBHashKey(attributeName = "username")
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @Override
    @DynamoDBIgnore
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        final Collection<SimpleGrantedAuthority> grantedAuthorities =
                new ArrayList<SimpleGrantedAuthority>(roles.size());
        for (String role : roles) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role));
        }
        return grantedAuthorities;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public boolean addRole(String role) {
        return this.roles.add(role.toUpperCase());
    }

    public List<String> getSensorList() {
        return sensorList;
    }

    public void setSensorList(List<String> sensorList) {
        this.sensorList = sensorList;
    }

    @Override
    @DynamoDBIgnore
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @DynamoDBIgnore
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @DynamoDBIgnore
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @DynamoDBIgnore
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        return username.equals(user.username);

    }

    @Override
    public int hashCode() {
        return username.hashCode();
    }

}
