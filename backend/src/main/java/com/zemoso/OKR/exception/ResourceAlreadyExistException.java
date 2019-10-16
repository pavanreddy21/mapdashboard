package com.zemoso.OKR.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;



public class ResourceAlreadyExistException extends RuntimeException {

    public ResourceAlreadyExistException(String message) {
        super(message);
    }

    public ResourceAlreadyExistException(String message, Throwable cause) {
        super(message, cause);
    }
}
