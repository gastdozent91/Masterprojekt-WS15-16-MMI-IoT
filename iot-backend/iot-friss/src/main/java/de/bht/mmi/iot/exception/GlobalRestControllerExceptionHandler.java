package de.bht.mmi.iot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

@ControllerAdvice
public class GlobalRestControllerExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({EntityNotFoundException.class, UsernameNotFoundException.class})
    public @ResponseBody PublicRestErrorMessage handleEntityNotFound(Exception e) {
        return new PublicRestErrorMessage(e);
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(EntityExistsException.class)
    public @ResponseBody PublicRestErrorMessage handleEntityExists(Exception e) {
        return new PublicRestErrorMessage(e);
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(AccessDeniedException.class)
    public @ResponseBody PublicRestErrorMessage handleAccessDenied(Exception e) {
        return new PublicRestErrorMessage(e);
    }

}
