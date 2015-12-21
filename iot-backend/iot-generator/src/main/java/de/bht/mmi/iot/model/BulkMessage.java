package de.bht.mmi.iot.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.ZonedDateTime;
import java.util.List;

public class BulkMessage<T> {

	@JsonProperty("location")
    private String location;
	
	@JsonProperty("gateway_name")
    private String gatewayName;
	
	@JsonProperty("id")
    private String sensorID;
	
    @JsonProperty("start_date_time")
    private ZonedDateTime startDateTime;

    @JsonProperty("end_date_time")
    private ZonedDateTime endDateTime;

    @JsonProperty("values")
    List<T> values;

    public ZonedDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(ZonedDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public ZonedDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(ZonedDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public List<T> getValues() {
        return values;
    }

    public void setValues(List<T> values) {
        this.values = values;
    }

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getGatewayName() {
		return gatewayName;
	}

	public void setGatewayName(String gatewayName) {
		this.gatewayName = gatewayName;
	}

	public String getSensorID() {
		return sensorID;
	}

	public void setSensorID(String sensorID) {
		this.sensorID = sensorID;
	}
    
}
