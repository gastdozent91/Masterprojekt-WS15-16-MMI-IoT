package de.bht.mmi.iot.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

public class SensorPutDto {

    @NotNull
    private boolean isActive;

    @NotNull
    private String location;

    private String clusterID;

    private String ownerName;

    @NotNull
    private int sensorType;

    private ArrayList<String> userList;

    @JsonCreator
    public SensorPutDto(@JsonProperty("isActive") boolean isActive,@JsonProperty("location") String location,
                        @JsonProperty("clusterID") String clusterID,@JsonProperty("ownerName") String ownerName,
                        @JsonProperty("sensorType")int sensorType,@JsonProperty("userList") ArrayList<String> userList) {
        this.isActive = isActive;
        this.location = location;
        this.clusterID = clusterID;
        this.ownerName = ownerName;
        this.sensorType = sensorType;
        this.userList = userList;
    }

    public boolean isActive() {
        return isActive;
    }

    public String getLocation() {
        return location;
    }

    public String getClusterID() {
        return clusterID;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public int getSensorType() {
        return sensorType;
    }

    public ArrayList<String> getUserList() {
        return userList;
    }
}
