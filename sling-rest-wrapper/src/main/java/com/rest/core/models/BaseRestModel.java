package com.rest.core.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import com.rest.core.utils.RestResourceUtil;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BaseRestModel {

    @Self
    @JsonIgnore
    private Resource resource;

    @ValueMapValue(name = RestResourceUtil.REQUEST_PARAMETER_WEDDING_RESOURCE_ID)
    private String id;

    @ValueMapValue(name = "sling:resourceType")
    private String resourceType;

    public String getResourcePath() {
        return resource.getPath();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }
}
