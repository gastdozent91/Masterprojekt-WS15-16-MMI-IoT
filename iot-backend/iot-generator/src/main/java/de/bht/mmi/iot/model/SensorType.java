package de.bht.mmi.iot.model;

public enum SensorType {

    SCALAR("scalar"),
    ACCELERATION("acceleration"),
    LOCATION("location"),
    ORIENTATION("orientation");

    private final String label;

    SensorType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }



}
