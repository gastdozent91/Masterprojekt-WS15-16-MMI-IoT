package de.bht.mmi.iot.exception;

import org.springframework.http.HttpStatus;

public class EntityExistsException extends AbstractApiException {

    public EntityExistsException(String message) {
        super(message, HttpStatus.CONFLICT);
    }

}
