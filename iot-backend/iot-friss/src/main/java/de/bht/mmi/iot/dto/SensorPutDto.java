package de.bht.mmi.iot.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import de.bht.mmi.iot.model.rest.SensorType;

import javax.validation.constraints.NotNull;
import java.util.List;

public class SensorPutDto {

    @NotNull
    private boolean isActive;

    @NotNull
    private String location;

    @NotNull
    private String attachedGateway;

    @NotNull
    private List<String> attachedClusters;

    @NotNull
    private String owner;

    @NotNull
    private SensorType sensorType;

    @JsonCreator
    public SensorPutDto(@JsonProperty("isActive") boolean isActive, @JsonProperty("location") String location,
                        @JsonProperty("clusterID") String clusterID, @JsonProperty("owner") String owner,
                        @JsonProperty("sensorType")SensorType sensorType,
                        @JsonProperty("attachedGateway") String attachedGateway,
                        @JsonProperty("attachedClusters") List<String> attachedClusters) {
        this.isActive = isActive;
        this.location = location;
        this.owner = owner;
        this.sensorType = sensorType;
        this.attachedGateway = attachedGateway;
        this.attachedClusters = attachedClusters;
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

    public SensorType getSensorType() {
        return sensorType;
    }

}
