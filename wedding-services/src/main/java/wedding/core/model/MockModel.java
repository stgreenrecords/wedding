package wedding.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.PostConstruct;

@Model(adaptables = Resource.class)
public class MockModel {

    @Self
    @JsonIgnore
    private Resource resource;

    private String path;

    @PostConstruct
    public void init() {
        path = resource.getPath();
    }

    public String getPath() {
        return path;
    }
}
