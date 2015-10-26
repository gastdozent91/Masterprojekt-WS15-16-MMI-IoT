package de.bht.mmi.hoefig.iot.model;

public final class Bar {

    private String id;

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
