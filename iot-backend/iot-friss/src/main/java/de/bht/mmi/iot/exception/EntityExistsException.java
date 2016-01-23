package de.bht.mmi.iot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class EntityExistsException extends AbstractApiException {

    public EntityExistsException(String message) {
        super(message);
    }

}
