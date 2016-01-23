package de.bht.mmi.iot.exception;

import org.springframework.http.HttpStatus;

public class NotAuthorizedException extends AbstractApiException {

    public NotAuthorizedException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }

}
