package de.bht.mmi.iot.config;

import org.apache.commons.lang3.StringUtils;

public enum DbInitMode {

    DROP_CREATE("drop-create"),
    VALIDATE("validate"),
    CREATE_MISSING("create-missing");

    private final String propertyValue;

    DbInitMode(String propertyValue) {
        this.propertyValue = propertyValue;
    }

    public String getPropertyValue() {
        return propertyValue;
    }

    public static DbInitMode fromPropertyValue(String propertyValue) {
        return DbInitMode.valueOf(StringUtils.replaceChars(propertyValue, '-', '_').toUpperCase());
    }

}
