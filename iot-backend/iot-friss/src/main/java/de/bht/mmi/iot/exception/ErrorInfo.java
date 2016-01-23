package de.bht.mmi.iot.exception;

import com.fasterxml.jackson.annotation.JsonProperty;

public final class ErrorInfo {

    private static final String DEFAULT_ERROR_MSG = "Sorry, no message provided";

    private final String url;

    @JsonProperty("error_message")
    private final String errorMessage;

    private ErrorInfo(String url, String errorMessage) {
        this.url = url;
        this.errorMessage = errorMessage;
    }

    public static ErrorInfo createInstance(String url, Exception e) {
        String message = e.getMessage();
        if (message == null) {
            message = DEFAULT_ERROR_MSG;
        }
        return new ErrorInfo(url, message);
    }

    public String getUrl() {
        return url;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    @Override
    public String toString() {
        return "ErrorInfo{" +
                "url='" + url + '\'' +
                ", errorMessage='" + errorMessage + '\'' +
                '}';
    }

}
