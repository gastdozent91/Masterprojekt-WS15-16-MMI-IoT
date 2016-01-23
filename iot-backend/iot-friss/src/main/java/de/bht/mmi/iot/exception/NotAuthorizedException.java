package de.bht.mmi.iot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class NotAuthorizedException extends AbstractApiException {

    public NotAuthorizedException(String message) {
        super(message);
    }

}
