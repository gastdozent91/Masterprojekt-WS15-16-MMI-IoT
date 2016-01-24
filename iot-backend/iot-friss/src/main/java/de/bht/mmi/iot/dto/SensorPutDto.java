package de.bht.mmi.iot.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.util.List;

public class SensorPutDto {

    @NotNull
    private boolean isActive;

    @NotNull
    private String name;

    @NotNull
    private String location;

    @NotNull
    private String attachedGateway;

    @NotNull
    private List<String> attachedClusters;

    @NotNull
    private String owner;

    @NotNull
    private List<String> sensorTypes;

    @JsonCreator
    public SensorPutDto(@JsonProperty("isActive") boolean isActive, @JsonProperty("location") String location,
                        @JsonProperty("clusterID") String clusterID, @JsonProperty("owner") String owner,
                        @JsonProperty("sensorTypes")List<String> sensorTypes,
                        @JsonProperty("attachedGateway") String attachedGateway,
                        @JsonProperty("attachedClusters") List<String> attachedClusters,
                        @JsonProperty("name") String name) {
        this.isActive = isActive;
        this.location = location;
        this.owner = owner;
        this.sensorTypes = sensorTypes;
        this.attachedGateway = attachedGateway;
        this.attachedClusters = attachedClusters;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public boolean isActive() {
        return isActive;
    }

    public String getLocation() {
        return location;
    }

    public String getAttachedGateway() {
        return attachedGateway;
    }

    public List<String> getAttachedClusters() {
        return attachedClusters;
    }

    public String getOwner() {
        return owner;
    }

    public List<String> getSensorTypes() {
        return sensorTypes;
    }
}
