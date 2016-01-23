package de.bht.mmi.iot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EntityNotFoundException extends AbstractApiException {

    public EntityNotFoundException(String message) {
        super(message);
    }

}
