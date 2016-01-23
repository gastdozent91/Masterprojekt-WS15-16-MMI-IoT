package de.bht.mmi.iot.exception;

import org.springframework.http.HttpStatus;

public class EntityNotFoundException extends AbstractApiException {

    public EntityNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }

}
