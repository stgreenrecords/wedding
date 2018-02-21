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
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class UserData {

    @Self
    @JsonIgnore
    private Resource resource;

    private String profile;

    @ValueMapValue
    private String userId;
    @ValueMapValue
    private String authType;
    @ValueMapValue
    private String type;
    @ValueMapValue
    private String firstName;
    @ValueMapValue
    private String lastName;
    @ValueMapValue
    private String name;
    @ValueMapValue
    private String phone;
    @ValueMapValue
    private String description;

    @ValueMapValue
    private String priceStart;
    @ValueMapValue
    private String priceEnd;

    @ValueMapValue
    private String email;
    @ValueMapValue
    private String siteLink;
    @ValueMapValue
    private String vkLink;
    @ValueMapValue
    private String facebookLink;
    @ValueMapValue
    private String instagramLink;
    @ValueMapValue
    private Boolean vipStatus;
    @ValueMapValue
    private String speciality;
    @ValueMapValue
    private String city;
    private String avatar;
    private List<String> portfolio;

    @ValueMapValue
    private String[] bookedDates;

    @PostConstruct
    public void init() {
        profile = resource.getPath();
        Optional.ofNullable(resource.getChild(Type.AVATAR.getRelPath()))
                .map(Resource::listChildren)
                .filter(Iterator::hasNext)
                .map(Iterator::next)
                .map(Resource::getPath)
                .ifPresent(this::setAvatar);
        portfolio = Optional.ofNullable(resource.getChild(Type.PORTFOLIO.getRelPath()))
                .map(Resource::listChildren)
                .map(WeddingResourceUtil::iteratorToOrderedStream)
                .orElse(Stream.empty())
                .map(Resource::getPath)
                .collect(Collectors.toList());
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAuthType() {
        return authType;
    }

    public void setAuthType(String authType) {
        this.authType = authType;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    public String getPriceStart() {
        return priceStart;
    }

    public void setPriceStart(String priceStart) {
        this.priceStart = priceStart;
    }

    public String getPriceEnd() {
        return priceEnd;
    }

    public void setPriceEnd(String priceEnd) {
        this.priceEnd = priceEnd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSiteLink() {
        return siteLink;
    }

    public void setSiteLink(String siteLink) {
        this.siteLink = siteLink;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
        this.profile = resource.getPath();
    }

    public String getAvatar() {
        return avatar;
    }

    private void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public List<String> getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(List<String> portfolio) {
        this.portfolio = portfolio;
    }

    public String getProfile() {
        return profile;
    }

    public Boolean isVip() {
        return vipStatus;
    }
}
