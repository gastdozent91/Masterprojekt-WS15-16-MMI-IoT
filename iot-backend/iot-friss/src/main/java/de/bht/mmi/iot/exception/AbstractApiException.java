package de.bht.mmi.iot.exception;

public abstract class AbstractApiException extends Exception {

    protected AbstractApiException(String message) {
        super(message);
    }

}
