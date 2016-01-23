package de.bht.mmi.iot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

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

    @ExceptionHandler(AbstractApiException.class)
    public @ResponseBody ResponseEntity<PublicRestErrorMessage> handleAbstractApiException(AbstractApiException e) {
        return new ResponseEntity<PublicRestErrorMessage>(new PublicRestErrorMessage(e), e.getResponseStatusCode());
    }

}
