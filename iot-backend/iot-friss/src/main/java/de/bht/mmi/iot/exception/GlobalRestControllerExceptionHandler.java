package de.bht.mmi.iot.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalRestControllerExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalRestControllerExceptionHandler.class);

    private static final HttpStatus DEFAULT_EXCEPTION_STATUS_CODE = HttpStatus.INTERNAL_SERVER_ERROR;

    @ExceptionHandler(AbstractApiException.class)
    public @ResponseBody ResponseEntity<ErrorInfo> handleAbstractApiException(
            HttpServletRequest req, AbstractApiException e) {
        final ResponseStatus resStatus = e.getClass().getAnnotation(ResponseStatus.class);
        final HttpStatus resStatusCode = resStatus != null ? resStatus.value() : DEFAULT_EXCEPTION_STATUS_CODE;

        final ErrorInfo errorInfo = ErrorInfo.createInstance(req.getRequestURL().toString(), e);
        LOGGER.warn(String.format("%s, %s", e.getClass().getSimpleName(), errorInfo.toString()));
        return new ResponseEntity<>(errorInfo, resStatusCode);
    }

}
