package de.bht.mmi.iot.model;

import java.util.UUID;

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

    @Override
    public String toString() {
        return "Bar{" +
                "id='" + id + '\'' +
                '}';
    }
}
