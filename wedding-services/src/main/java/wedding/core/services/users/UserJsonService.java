package wedding.core.services.users;

import org.apache.sling.api.resource.ResourceResolver;

public interface UserJsonService {
    String getUserData(ResourceResolver resourceResolver, String id);

    void setUserData(ResourceResolver resourceResolver, String jsonData);
}
