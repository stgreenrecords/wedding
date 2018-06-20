package wedding.core.replication;

import org.apache.sling.api.resource.Resource;

import javax.jcr.RepositoryException;
import java.io.IOException;

public interface Replicator {
    void replicate(String path) throws RepositoryException, IOException;

    void replicate(Resource resource) throws RepositoryException, IOException;
}
