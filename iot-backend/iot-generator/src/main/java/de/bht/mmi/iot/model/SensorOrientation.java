package de.bht.mmi.iot.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public final class SensorOrientation {

    @JsonProperty
    private final BigDecimal w,x,y,z;

    public SensorOrientation(Number w, Number x,Number y,Number z) {
    	this.w = new BigDecimal(w.toString());
        this.x = new BigDecimal(x.toString());
        this.y = new BigDecimal(y.toString());
        this.z = new BigDecimal(z.toString());
    }

    @Override
    public String toString() {
        return "Orientation{" +
                "w;x;y;z=" + 
                w + ";" +
                x + ";" +
                y + ";" +
                z +
                '}';
    }

}
