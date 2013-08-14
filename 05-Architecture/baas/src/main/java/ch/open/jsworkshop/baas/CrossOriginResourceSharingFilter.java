package ch.open.jsworkshop.baas;

import com.sun.jersey.spi.container.ContainerRequest;
import com.sun.jersey.spi.container.ContainerResponse;
import com.sun.jersey.spi.container.ContainerResponseFilter;

/**
 *
 * @author marcbaechinger
 */
public class CrossOriginResourceSharingFilter implements ContainerResponseFilter {

    @Override
    public ContainerResponse filter(ContainerRequest request, ContainerResponse response) {
        response.getHttpHeaders().putSingle("Access-Control-Allow-Origin", "*");
        response.getHttpHeaders().putSingle("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        response.getHttpHeaders().putSingle("Access-Control-Allow-Headers", "content-type,authorization,x-requested-with");
        response.getHttpHeaders().putSingle("Access-Control-Max-Age", "1728000");
        return response;
    }
}
