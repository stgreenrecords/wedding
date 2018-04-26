package wedding.core.services.users.impl;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.ResourceResolver;
import wedding.core.model.ClientModel;
import wedding.core.services.users.UserJsonService;
import wedding.core.utils.SlingModelUtil;
import wedding.core.utils.WeddingResourceUtil;

import java.util.function.Consumer;

@Component
@Service
public class UserJsonServiceImpl implements UserJsonService {

    @Override
    public String getUserData(ResourceResolver resourceResolver, String id) {
        return WeddingResourceUtil.getUserData(resourceResolver, id)
                .map(WeddingResourceUtil::toJson)
                .orElse("{}");
    }

    @Override
    public void setUserData(ResourceResolver resourceResolver, String jsonData) {
        WeddingResourceUtil.fromJson(jsonData, ClientModel.class)
                .ifPresent(updateModel(resourceResolver));
    }

    private Consumer<ClientModel> updateModel(ResourceResolver resourceResolver) {
        return userData -> WeddingResourceUtil.getUserResource(resourceResolver, userData.getId())
                .ifPresent(resource -> {
                    userData.setResource(resource);
                    SlingModelUtil.updateModel(userData);
                });
    }
}
