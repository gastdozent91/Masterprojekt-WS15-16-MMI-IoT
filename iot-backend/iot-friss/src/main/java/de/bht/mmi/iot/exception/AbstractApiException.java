package de.bht.mmi.iot.exception;

import org.springframework.http.HttpStatus;

public abstract class AbstractApiException extends Exception {

    private final HttpStatus responseStatusCode;

    protected AbstractApiException(String message, HttpStatus responseStatusCode) {
        super(message);
        this.responseStatusCode = responseStatusCode;
    }

    public HttpStatus getResponseStatusCode() {
        return responseStatusCode;
    }

}
