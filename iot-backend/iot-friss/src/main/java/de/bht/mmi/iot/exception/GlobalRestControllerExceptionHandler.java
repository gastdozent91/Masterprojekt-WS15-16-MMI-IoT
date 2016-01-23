package de.bht.mmi.iot.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalRestControllerExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalRestControllerExceptionHandler.class);

    @ExceptionHandler(AbstractApiException.class)
    public @ResponseBody ResponseEntity<PublicRestErrorMessage> handleAbstractApiException(AbstractApiException e) {
        LOGGER.warn(e.getMessage());
        return new ResponseEntity<PublicRestErrorMessage>(new PublicRestErrorMessage(e), e.getResponseStatusCode());
    }

}
