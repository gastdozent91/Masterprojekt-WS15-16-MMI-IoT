package de.bht.mmi.iot.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class SensorScalar {

    @JsonProperty
    private final BigDecimal value;

    public SensorScalar(BigDecimal value) {
        this.value = value;
    }

    public SensorScalar(Number value) {
        this.value = new BigDecimal(value.toString());
    }

    public BigDecimal getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "SensorScalar{" +
                "value=" + value +
                '}';
    }

}
