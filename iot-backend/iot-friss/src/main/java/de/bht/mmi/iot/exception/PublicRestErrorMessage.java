package de.bht.mmi.iot.exception;

import com.fasterxml.jackson.annotation.JsonProperty;

public final class PublicRestErrorMessage {

    @JsonProperty("error_message")
    private final String errorMessage;

    public PublicRestErrorMessage(Exception e) {
        this.errorMessage = e.getMessage();
    }

}
