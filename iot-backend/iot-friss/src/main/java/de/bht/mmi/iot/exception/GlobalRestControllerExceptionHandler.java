package de.bht.mmi.iot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

@ControllerAdvice
public class GlobalRestControllerExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({EntityNotFoundException.class, UsernameNotFoundException.class})
    public PublicRestErrorMessage handleEntityNotFound(Exception e) {
        return new PublicRestErrorMessage(e);
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(EntityExistsException.class)
    public PublicRestErrorMessage handleEntityExists(Exception e) {
        return new PublicRestErrorMessage(e);
    }


}
