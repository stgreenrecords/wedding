package wedding.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import wedding.core.services.binary.impl.Type;
import wedding.core.utils.WeddingResourceUtil;

import javax.annotation.PostConstruct;
import java.util.Iterator;
import java.util.Optional;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BaseUserModel {

    @Self
    @JsonIgnore
    private Resource resource;

    @ValueMapValue(name = WeddingResourceUtil.REQUEST_PARAMETER_WEDDING_RESOURCE_ID)
    private String id;

    @ValueMapValue
    private String authType;

    @ValueMapValue
    private String firstName;

    @ValueMapValue
    private String lastName;

    @ValueMapValue
    private String phone;

    @ValueMapValue
    private String email;

    @ValueMapValue
    private String city;

    @ValueMapValue
    private String vkLink;

    @ValueMapValue
    private String facebookLink;

    @ValueMapValue
    private String instagramLink;

    private String avatar;

    @PostConstruct
    public void init() {
        Optional.ofNullable(resource.getChild(Type.AVATAR.getRelPath()))
                .map(Resource::listChildren)
                .filter(Iterator::hasNext)
                .map(Iterator::next)
                .map(Resource::getPath)
                .ifPresent(this::setAvatar);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuthType() {
        return authType;
    }

    public void setAuthType(String authType) {
        this.authType = authType;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public String getAvatar() {
        return avatar;
    }

    private void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getVkLink() {
        return vkLink;
    }

    public void setVkLink(String vkLink) {
        this.vkLink = vkLink;
    }

    public String getFacebookLink() {
        return facebookLink;
    }

    public void setFacebookLink(String facebookLink) {
        this.facebookLink = facebookLink;
    }

    public String getInstagramLink() {
        return instagramLink;
    }

    public void setInstagramLink(String instagramLink) {
        this.instagramLink = instagramLink;
    }

}
