package ch.open.jsworkshop.baas.service;

import ch.open.jsworkshop.baas.model.ToDo;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author chopen2013
 */
@Path("todo")
@RequestScoped
public class TodoResource {

private static final Map<String, ToDo> database = new HashMap<>();
    static {
        ToDo learnJavascript = new ToDo("Learn JavaScript", "a thing every developer should do");
        learnJavascript.setDone(true);
        database.put(learnJavascript.getId(), learnJavascript);
        ToDo leverageHTML5 = new ToDo("Leverage HTML", "its getting more and more powerful");
        database.put(leverageHTML5.getId(), leverageHTML5);
    }
    
    
    @GET
    @Produces("application/json")
    public Collection<ToDo> getAll() throws ServiceException {
        return database.values();
    }
    
    
    @GET
    @Path("/{uuid}")
    @Produces("application/json")
    public ToDo get(@PathParam("uuid")String id) throws ServiceException {
        if (!database.containsKey(id)) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        return database.get(id);
    }
    
    
    @PUT
    @Consumes("application/json")
    @Produces("application/json")
    public ToDo createToDo(ToDo toDo) throws ServiceException {
        final ToDo persistentInstance = new ToDo(toDo.getTitle(), toDo.getDescription());
        database.put(persistentInstance.getId(), persistentInstance);
        return persistentInstance;
    }
    
    
    @POST
    @Path("/{uuid}")
    @Produces("application/json")
    public ToDo updateToDo(@PathParam("uuid") String id, ToDo toDo) throws ServiceException {
        if (database.containsKey(id)) {
            ToDo persistentToDo = database.get(id);
            persistentToDo.setTitle(toDo.getTitle());
            persistentToDo.setDescription(toDo.getDescription());
            persistentToDo.setDone(toDo.isDone());
            return persistentToDo;
        } else {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
    }
    
    @DELETE
    @Path("/{uuid}")
    public void deleteToDo(@PathParam("uuid") String id) {
        if (database.containsKey(id)) {
            database.remove(id);
        } else {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
    }
}
