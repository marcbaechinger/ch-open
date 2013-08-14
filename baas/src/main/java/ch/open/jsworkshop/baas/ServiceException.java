package ch.open.jsworkshop.baas;

/**
 *
 * @author marcbaechinger
 */
public class ServiceException extends Exception {

    public ServiceException(String string) {
        super(string);
    }

    public ServiceException(String string, Throwable thrwbl) {
        super(string, thrwbl);
    }

    public ServiceException(Throwable thrwbl) {
        super(thrwbl);
    }
    
}
