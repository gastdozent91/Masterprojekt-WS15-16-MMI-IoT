package de.bht.mmi.iot.dto;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class SensorPostDto {

    @NotNull
    private boolean isActive;

    @NotNull
    private String location;

    private String clusterID;

    @NotNull
    private int sensorType;

    @JsonCreator
    public SensorPostDto(@JsonProperty("isActive") boolean isActive, @JsonProperty("location") String location,
                         @JsonProperty("clusterID") String clusterID, @JsonProperty("sensorType") int sensorType) {
        this.isActive = isActive;
        this.location = location;
        this.clusterID = clusterID;
        this.sensorType = sensorType;
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

    public int getSensorType() {
        return sensorType;
    }
}
