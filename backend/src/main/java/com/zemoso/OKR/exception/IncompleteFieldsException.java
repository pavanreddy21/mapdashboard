package com.zemoso.OKR.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;



public class IncompleteFieldsException extends RuntimeException {

    public IncompleteFieldsException(String message) {
        super(message);
    }

    public IncompleteFieldsException(String message, Throwable cause) {
        super(message, cause);
    }
}
