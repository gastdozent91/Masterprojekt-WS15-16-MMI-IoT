package de.bht.mmi.iot.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public final class SensorAcceleration {

    @JsonProperty
    private final BigDecimal x,y,z;

    public SensorAcceleration(Number x,Number y,Number z) {
        this.x = new BigDecimal(x.toString());
        this.y = new BigDecimal(y.toString());
        this.z = new BigDecimal(z.toString());
    }

    @Override
    public String toString() {
        return "Acceleration{" +
                "x;y;z=" + 
        		x + ";" +
                y + ";" +
                z +
                '}';
    }

}
