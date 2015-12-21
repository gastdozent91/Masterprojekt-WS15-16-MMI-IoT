package de.bht.mmi.iot.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public final class SensorLocation {

    @JsonProperty
    private final BigDecimal latitude, longitude;

    public SensorLocation(Number lati,Number longi) {
        this.latitude = new BigDecimal(lati.toString());
        this.longitude = new BigDecimal(longi.toString());
    }

    @Override
    public String toString() {
        return "Location{" +
                "latitude;longitude=" + 
                latitude + ";" +
        		longitude +
                '}';
    }

}
