package de.bht.mmi.hoefig.iot.model;

import lombok.ToString;

import java.util.UUID;

@ToString
public final class Bar {

    private String id;

    public Bar() { }

    public Bar(String id) {
        this.id = id;
    }

    public static Bar newInstance() {
        final String uuid = UUID.randomUUID().toString();
        final String randomId = uuid.substring(0, 4);
        return new Bar(randomId);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
