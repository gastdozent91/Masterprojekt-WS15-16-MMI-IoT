package de.bht.mmi.iot.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import de.bht.mmi.iot.model.rest.SensorType;

import javax.validation.constraints.NotNull;
import java.util.List;

public class SensorPostDto {

    @NotNull
    private boolean isActive;

    @NotNull
    private String name;

    @NotNull
    private String location;

    @NotNull
    private SensorType sensorType;

    @NotNull
    private String attachedGateway;

    @NotNull
    private List<String> attachedClusters;

    @JsonCreator
    public SensorPostDto(@JsonProperty("isActive") boolean isActive, @JsonProperty("location") String location,
                         @JsonProperty("sensorType") SensorType sensorType,
                         @JsonProperty("attachedGateway") String attachedGateway,
                         @JsonProperty("attachedClusters") List<String> attachedClusters,
                         @JsonProperty("name") String name) {
        this.isActive = isActive;
        this.location = location;
        this.sensorType = sensorType;
        this.attachedGateway = attachedGateway;
        this.attachedClusters = attachedClusters;
        this.name = name;
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

    public SensorType getSensorType() {
        return sensorType;
    }

    public String getName() {
        return name;
    }
}
